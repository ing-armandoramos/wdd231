// scripts/tools.js

const container = document.getElementById('tools-container');

// Pomodoro Title
const title = document.createElement('h2');
title.textContent = 'Pomodoro Timer';
container.appendChild(title);

// Timer display
const timerDisplay = document.createElement('h3');
container.appendChild(timerDisplay);

// Load previous state if exists
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || 25 * 60;
let timer = null;

// Load session history or create empty array
let sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || [];

// Stats panel
const statsPanel = document.createElement('div');
statsPanel.classList.add('stats-panel');
container.appendChild(statsPanel);

// Session history panel
const historyPanel = document.createElement('div');
historyPanel.classList.add('history-panel');
container.appendChild(historyPanel);

// Display Functions
function updateStatsDisplay() {
  const totalSessions = sessionHistory.length;
  const totalMinutes = sessionHistory.reduce((sum, s) => sum + s.duration, 0);

  statsPanel.innerHTML = `
    <h4>📊 Study Stats</h4>
    <p>Sessions Completed: ${totalSessions}</p>
    <p>Total Study Minutes: ${totalMinutes}</p>
  `;
}

function updateHistoryDisplay() {
  historyPanel.innerHTML = `<h4>📅 Session History</h4>`;
  if (sessionHistory.length === 0) {
    historyPanel.innerHTML += "<p>No sessions recorded yet.</p>";
    return;
  }

  const list = document.createElement('ul');
  sessionHistory.slice(-10).reverse().forEach(session => {
    const li = document.createElement('li');
    const date = new Date(session.timestamp);
    li.textContent = `${date.toLocaleString()} - ${session.duration} min`;
    list.appendChild(li);
  });
  historyPanel.appendChild(list);
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

// Initial load
updateStatsDisplay();
updateHistoryDisplay();
updateDisplay();

// Start Button
const startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.onclick = () => {
  if (timer) return; // Avoid multiple intervals

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();
    localStorage.setItem('timeLeft', timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      localStorage.removeItem('timeLeft');
      handleSessionComplete();
    }
  }, 1000);
};
container.appendChild(startButton);

// Reset Button
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset';
resetButton.onclick = () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 25 * 60;
  updateDisplay();
  localStorage.removeItem('timeLeft');
};
container.appendChild(resetButton);

// Fullscreen Button
const fullscreenButton = document.createElement('button');
fullscreenButton.textContent = 'Go Fullscreen';
fullscreenButton.onclick = () => {
  document.documentElement.requestFullscreen();
};
container.appendChild(fullscreenButton);

// Handle completed Pomodoro
function handleSessionComplete() {
  const newSession = {
    timestamp: new Date().toISOString(),
    duration: 25
  };

  sessionHistory.push(newSession);
  localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));

  updateStatsDisplay();
  updateHistoryDisplay();

  alert("🎉 Pomodoro Complete! Session Recorded.");
  timeLeft = 25 * 60;
  updateDisplay();
}

// Optional: Clear history button for testing
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear History';
clearButton.onclick = () => {
  if (confirm("Are you sure? All data will be lost.")) {
    localStorage.removeItem('sessionHistory');
    sessionHistory = [];
    updateStatsDisplay();
    updateHistoryDisplay();
  }
};
container.appendChild(clearButton);
