document.getElementById('file').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = e.target.result;
      const data = csvToArray(text);
      if (data.length > 0) {
        preencherTabela(data);
        preencherColunas(data);
      } else {
        console.error("Nenhum dado encontrado no CSV.");
      }
    };
    reader.readAsText(file);
  }
});

function csvToArray(str, delimiter = ",") {
  str = str.replace(/\r/g, '');
  
  if (str.indexOf("\n") === -1) {
    console.error("CSV não possui quebras de linha.");
    return [];
  }
  
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
  const rows = str.slice(str.indexOf("\n") + 1)
                  .split("\n")
                  .filter(row => row.trim() !== "");
  
  const arr = rows.map(function(row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function(object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  
  return arr;
}

function preencherTabela(data) {
  const cabecalho = document.getElementById('cabecalho');
  const corpo = document.getElementById('corpo');

  cabecalho.innerHTML = '';
  corpo.innerHTML = '';

  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement('th');
    th.innerText = header;
    cabecalho.appendChild(th);
  });

  data.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.innerText = row[header] || '';
      tr.appendChild(td);
    });
    corpo.appendChild(tr);
  });
}

function preencherColunas(data) {
  const colunaSelect = document.getElementById('coluna');
  colunaSelect.innerHTML = '';
  
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const option = document.createElement('option');
    option.value = header;
    option.innerText = header;
    colunaSelect.appendChild(option);
  });
}

// Adicionando evento de input para o campo de filtro
document.getElementById('filtro').addEventListener('input', filtrar);

function filtrar() {
  const filtro = document.getElementById('filtro').value.toLowerCase();
  const coluna = document.getElementById('coluna').value;
  const tabela = document.getElementById('tabela');
  const linhas = tabela.getElementsByTagName('tr');
  
  if (linhas.length === 0) return;

  const headers = Array.from(linhas[0].getElementsByTagName('th'));
  const colunaIndex = headers.findIndex(th => th.innerText === coluna);
  
  if (colunaIndex === -1) return;

  for (let i = 1; i < linhas.length; i++) {
    const celulas = linhas[i].getElementsByTagName('td');
    const textoCelula = celulas[colunaIndex]?.innerText?.toLowerCase() || '';
    linhas[i].style.display = textoCelula.includes(filtro) ? '' : 'none';
  }
}