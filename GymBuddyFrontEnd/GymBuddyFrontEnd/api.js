const API_BASE_URL = 'http://localhost:5012';

// Fetch all training sessions
async function getAllSessions() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch sessions');
  return await response.json();
}

// Fetch a specific training session
async function getSession(date) {
  const response = await fetch(`${API_BASE_URL}/${date}`);
  if (!response.ok) throw new Error('Failed to fetch session');
  return await response.json();
}

// Add a new training session
async function addSession(session) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session),
  });
  if (!response.ok) throw new Error('Failed to add session');
  return await response.json();
}

// Delete a training session
async function deleteSession(date) {
  const response = await fetch(`${API_BASE_URL}/${date}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete session');
}
