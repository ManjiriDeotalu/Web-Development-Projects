let startTime;
let isRunning = false;
let lapCounter = 1;

function startPause() {
    const startPauseButton = document.getElementById("startPause");

    if (!isRunning) {
        startPauseButton.textContent = "Pause";
        startTime = new Date().getTime() - lapCounter * 1000;
        updateDisplay();
        intervalId = setInterval(updateDisplay, 1000);
    } else {
        startPauseButton.textContent = "Resume";
        clearInterval(intervalId);
    }

    isRunning = !isRunning;
}

function reset() {
    const startPauseButton = document.getElementById("startPause");
    startPauseButton.textContent = "Start";
    clearInterval(intervalId);
    isRunning = false;
    lapCounter = 1;
    updateDisplay();
    document.getElementById("lapList").innerHTML = "";
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapList = document.getElementById("lapList");
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${formattedTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(minutes / 60);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes % 60).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
