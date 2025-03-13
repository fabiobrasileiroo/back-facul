document.getElementById('file').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = e.target.result;
      const data = csvToArray(text);
      preencherTabela(data);
      preencherColunas(data);
    };
    reader.readAsText(file);
  }
});

function csvToArray(str, delimiter = ",") {
  // Extrai os cabeçalhos (primeira linha)
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  // Extrai as linhas restantes e filtra linhas vazias
  const rows = str.slice(str.indexOf("\n") + 1)
                  .split("\n")
                  .filter(row => row.trim() !== "");
  
  // Mapeia cada linha para um objeto com base nos cabeçalhos
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
  const tabela = document.getElementById('tabela');
  const cabecalho = document.getElementById('cabecalho');
  const corpo = document.getElementById('corpo');

  // Limpa cabeçalho e corpo da tabela
  cabecalho.innerHTML = '';
  corpo.innerHTML = '';

  // Preenche o cabeçalho
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement('th');
    th.innerText = header;
    cabecalho.appendChild(th);
  });

  // Preenche o corpo da tabela
  data.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.innerText = row[header];
      tr.appendChild(td);
    });
    corpo.appendChild(tr);
  });
}

function preencherColunas(data) {
  const colunaSelect = document.getElementById('coluna');
  const headers = Object.keys(data[0]);
  
  // Limpa o seletor de colunas
  colunaSelect.innerHTML = '';

  // Preenche o seletor com os cabeçalhos
  headers.forEach(header => {
    const option = document.createElement('option');
    option.value = header;
    option.innerText = header;
    colunaSelect.appendChild(option);
  });
}

function filtrar() {
  const filtro = document.getElementById('filtro').value.toLowerCase();
  const coluna = document.getElementById('coluna').value;
  const tabela = document.getElementById('tabela');
  const linhas = tabela.getElementsByTagName('tr');
  
  // Obtém os cabeçalhos e define o índice da coluna a ser filtrada
  const headers = Array.from(linhas[0].getElementsByTagName('th'));
  const colunaIndex = headers.findIndex(th => th.innerText === coluna);
  if (colunaIndex === -1) {
    console.error("Coluna não encontrada!");
    return;
  }
  
  // Itera sobre as linhas (exceto o cabeçalho) para aplicar o filtro
  for (let i = 1; i < linhas.length; i++) {
    const celulas = linhas[i].getElementsByTagName('td');
    if (celulas[colunaIndex].innerText.toLowerCase().includes(filtro)) {
      linhas[i].style.display = '';
    } else {
      linhas[i].style.display = 'none';
    }
  }
}
