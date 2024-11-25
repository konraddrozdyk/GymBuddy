import './style.css'

import { getAllSessions, addSession, deleteSession } from './api.js';

const sessionsList = document.getElementById('sessions');
const addSessionButton = document.getElementById('add-session');
const sessionDateInput = document.getElementById('session-date');

// Fetch and display all sessions
async function loadSessions() {
  try {
    const sessions = await getAllSessions();
    sessionsList.innerHTML = ''; // Clear existing list

    sessions.forEach((session) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${session.date} - ${session.exercises.length} exercises`;
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => handleDeleteSession(session.date));

      listItem.appendChild(deleteButton);
      sessionsList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
    alert('Failed to load sessions');
  }
}

// Handle adding a new session
async function handleAddSession() {
  const date = sessionDateInput.value;
  if (!date) {
    alert('Please select a date');
    return;
  }

  const newSession = {
    date: date,
    exercises: [], // Placeholder, update as needed
  };

  try {
    await addSession(newSession);
    sessionDateInput.value = ''; // Clear the input
    loadSessions(); // Refresh the list
  } catch (error) {
    console.error(error);
    alert('Failed to add session');
  }
}

// Handle deleting a session
async function handleDeleteSession(date) {
  if (!confirm('Are you sure you want to delete this session?')) return;

  try {
    await deleteSession(date);
    loadSessions(); // Refresh the list
  } catch (error) {
    console.error(error);
    alert('Failed to delete session');
  }
}

// Attach event listeners
addSessionButton.addEventListener('click', handleAddSession);

// Load sessions on page load
loadSessions();
