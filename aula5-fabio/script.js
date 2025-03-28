document.getElementById('csvFile').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const csvData = e.target.result;
      const table = csvToTable(csvData);
      document.getElementById('tableContainer').innerHTML = '';
      document.getElementById('tableContainer').appendChild(table);
    };
    reader.readAsText(file, 'ISO-8859-1'); // Ajuste o encoding se necessário
  }
});

function csvToTable(csv) {
  const rows = csv.split('\n').filter(row => row.trim() !== '');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Cabeçalho
  const headerRow = document.createElement('tr');
  rows[0].split(';').forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.trim();
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Dados
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].split(';').map(cell => cell.trim());
    const tr = document.createElement('tr');
    cells.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell || 'N/A'; // Mostra 'N/A' para campos vazios
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
}