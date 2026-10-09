// =============================================================================
// MDT312 Assignment 7 - Square Game
// JavaScript 3: DOM Manipulation, Event, Timer
// =============================================================================

window.onload = pageLoad;

let timer = null;
let timeLeft = 30;
let gameRunning = false;

function pageLoad() {
    const startBtn = document.getElementById("start");
    startBtn.onclick = startGame;

    // Event Delegation: listen on the parent instead of every square.
    const gameLayer = document.getElementById("layer");
    gameLayer.onclick = function (event) {
        if (!gameRunning) return;

        if (event.target.classList.contains("square")) {
            event.target.remove();
            checkWin();
        }
    };
}

function startGame() {
    const numbox = parseInt(document.getElementById("numbox").value);

    if (isNaN(numbox) || numbox < 1 || numbox > 100) {
        alert("Please enter the number of squares from 1 to 100.");
        return;
    }

    clearScreen();
    clearInterval(timer);
    gameRunning = true;
    document.getElementById("clock").textContent = "30";
    document.getElementById("status").textContent = "Click all squares before time runs out!";

    addBox();
    timeStart();
}

function timeStart() {
    const TIMER_TICK = 1000;
    timeLeft = 30;

    clearInterval(timer);

    timer = setInterval(function () {
        const allbox = document.querySelectorAll("#layer .square");

        if (allbox.length === 0) {
            clearInterval(timer);
            timer = null;
            gameRunning = false;
            document.getElementById("clock").textContent = "0";
            document.getElementById("status").textContent = "🎉 You win! All squares cleared!";
            return;
        }

        timeLeft--;
        document.getElementById("clock").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            gameRunning = false;
            clearScreen();
            document.getElementById("status").textContent = "⏰ Game over! Try again.";
            document.getElementById("clock").textContent = "0";
        }
    }, TIMER_TICK);
}

function addBox() {
    const numbox = parseInt(document.getElementById("numbox").value);
    const gameLayer = document.getElementById("layer");
    const colorDrop = document.getElementById("color").value;

    for (let i = 0; i < numbox; i++) {
        const tempbox = document.createElement("div");
        tempbox.className = "square " + colorDrop;
        tempbox.id = "box" + i;
        tempbox.style.left = Math.random() * (gameLayer.clientWidth - 29) + "px";
        tempbox.style.top = Math.random() * (gameLayer.clientHeight - 29) + "px";

        gameLayer.appendChild(tempbox);
    }

    updateRemaining();
}

function checkWin() {
    updateRemaining();

    const allbox = document.querySelectorAll("#layer .square");
    if (allbox.length === 0) {
        clearInterval(timer);
        timer = null;
        gameRunning = false;
        document.getElementById("status").textContent = "🎉 You win! All squares cleared!";
    }
}

function updateRemaining() {
    const remaining = document.querySelectorAll("#layer .square").length;
    document.getElementById("remaining").textContent = remaining;
}

function clearScreen() {
    const allbox = document.querySelectorAll("#layer .square");

    for (let i = 0; i < allbox.length; i++) {
        allbox[i].remove();
    }

    updateRemaining();
}
