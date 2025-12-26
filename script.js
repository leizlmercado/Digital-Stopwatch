let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;
let lastLapTime = 0;

const timeDisplay = document.getElementById('timeDisplay');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const startStopText = document.getElementById('startStopText');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const themeToggle = document.getElementById('themeToggle');

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const icon = themeToggle.querySelector('.theme-icon');
  icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const icon = themeToggle.querySelector('.theme-icon');
  icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
});

function updateDisplay() {
  const totalMilliseconds = elapsedTime + (isRunning ? Date.now() - startTime : 0);
  
  const hours = Math.floor(totalMilliseconds / 3600000);
  const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
  
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
  millisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
}

function toggleStartStop() {
  if (!isRunning) {
    // Start the stopwatch
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
    
    startStopText.textContent = 'Stop';
    startStopBtn.classList.remove('btn-primary');
    startStopBtn.classList.add('btn-secondary');
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    timeDisplay.parentElement.parentElement.classList.add('running');
  } else {
    // Stop the stopwatch
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    isRunning = false;
    
    startStopText.textContent = 'Start';
    startStopBtn.classList.remove('btn-secondary');
    startStopBtn.classList.add('btn-primary');
    lapBtn.disabled = true;
    timeDisplay.parentElement.parentElement.classList.remove('running');
  }
}

function reset() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
  
  elapsedTime = 0;
  startTime = 0;
  lastLapTime = 0;
  lapCount = 0;
  
  updateDisplay();
  
  startStopText.textContent = 'Start';
  startStopBtn.classList.remove('btn-secondary');
  startStopBtn.classList.add('btn-primary');
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  timeDisplay.parentElement.parentElement.classList.remove('running');
  
  clearLaps();
}

function recordLap() {
  if (!isRunning) return;
  
  const currentTime = elapsedTime + (Date.now() - startTime);
  const lapTime = currentTime - lastLapTime;
  lastLapTime = currentTime;
  lapCount++;
  
  const lapItem = document.createElement('div');
  lapItem.className = 'lap-item';
  
  const lapNumber = document.createElement('div');
  lapNumber.className = 'lap-number';
  lapNumber.textContent = `Lap ${lapCount}`;
  
  const lapTimeDisplay = document.createElement('div');
  lapTimeDisplay.className = 'lap-time';
  
  const hours = Math.floor(lapTime / 3600000);
  const minutes = Math.floor((lapTime % 3600000) / 60000);
  const seconds = Math.floor((lapTime % 60000) / 1000);
  const milliseconds = Math.floor((lapTime % 1000) / 10);
  
  let timeString = '';
  if (hours > 0) {
    timeString += `${hours.toString().padStart(2, '0')}:`;
  }
  timeString += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  
  lapTimeDisplay.textContent = timeString;
  
  lapItem.appendChild(lapNumber);
  lapItem.appendChild(lapTimeDisplay);
  lapsList.appendChild(lapItem);
  
  // Show clear button if there are laps
  if (lapCount > 0) {
    clearLapsBtn.style.display = 'block';
  }
  
  // Auto-scroll to latest lap
  lapsList.scrollTop = lapsList.scrollHeight;
}

function clearLaps() {
  lapsList.innerHTML = '';
  lapCount = 0;
  lastLapTime = 0;
  clearLapsBtn.style.display = 'none';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Space bar to start/stop
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    if (!resetBtn.disabled || isRunning) {
      toggleStartStop();
    }
  }
  
  // R key to reset
  if (e.code === 'KeyR' && e.target === document.body && !resetBtn.disabled) {
    e.preventDefault();
    reset();
  }
  
  // L key for lap
  if (e.code === 'KeyL' && e.target === document.body && !lapBtn.disabled) {
    e.preventDefault();
    recordLap();
  }
});

// Initialize display
updateDisplay();

