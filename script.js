const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");
const lapCount = document.getElementById("lapCount");

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapNumber = 0;

function formatTime(milliseconds) {
  const totalCentiseconds = Math.floor(milliseconds / 10);
  const centiseconds = totalCentiseconds % 100;
  const totalSeconds = Math.floor(totalCentiseconds / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (timerInterval !== null) {
    return;
  }

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = 0;
  elapsedTime = 0;
  lapNumber = 0;
  display.textContent = "00:00:00.00";
  lapList.innerHTML = "";
  lapCount.textContent = "0 laps";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function recordLap() {
  if (elapsedTime === 0) {
    return;
  }

  lapNumber += 1;
  const lapItem = document.createElement("li");
  lapItem.innerHTML = `<span>Lap ${lapNumber}</span><strong>${formatTime(elapsedTime)}</strong>`;
  lapList.prepend(lapItem);
  lapCount.textContent = `${lapNumber} ${lapNumber === 1 ? "lap" : "laps"}`;
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

resetStopwatch();