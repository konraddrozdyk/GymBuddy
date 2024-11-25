const API_BASE_URL = 'http://localhost:5012/api/Training';

async function GetAllSessions() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch sessions');
  const json = await response.json();
  displayData(json);
}

// Display data in table format
function displayData(jsonobject) {
  const table = document.querySelector('#table');
  table.innerHTML = '';

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `<th>ID</th><th>Date</th><th>Exercise</th>`;
  table.appendChild(headerRow);

  jsonobject.forEach((session) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${session.id}</td>
      <td>${session.date}</td>
      <td>${session.exercise}</td>
    `;
    table.appendChild(row);
  });
}

GetAllSessions();
