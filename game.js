const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') || 'shinchan';
const size = parseInt(params.get('size')) || 3;

let timer = 0, turns = 0, interval, isPaused = false;
let currTile, otherTile;

const levelImages = {
    shinchan: { 3:"images/shinchan/SC1.jpg", 4:"images/shinchan/SC2.jpg", 5:"images/shinchan/SC3.jpg", 6:"images/shinchan/SC4.jpg" },
    spongebob: { 3:"images/spongebob/SP1.jpg", 4:"images/spongebob/SP2.jpg", 5:"images/spongebob/SP3.jpg", 6:"images/spongebob/SP4.jpg" },
    familyguy: { 3:"images/familyguy/FG1.jpg", 4:"images/familyguy/FG2.jpg", 5:"images/familyguy/FG3.jpg", 6:"images/familyguy/FG4.jpg" },
    tomjerry: { 3:"images/tomjerry/TJ1.jpg", 4:"images/tomjerry/TJ2.jpg", 5:"images/tomjerry/TJ3.jpg", 6:"images/tomjerry/TJ4.jpg" },
    scoobydoo: { 3:"images/scoobydoo/SD1.jpg", 4:"images/scoobydoo/SD2.jpg", 5:"images/scoobydoo/SD3.jpg", 6:"images/scoobydoo/SD4.jpg" },
    oggy: { 3:"images/oggy/O1.jpg", 4:"images/oggy/O2.jpg", 5:"images/oggy/O3.jpg", 6:"images/oggy/O4.jpg" }
};

window.onload = function() {
    const fullImg = document.getElementById("fullImage");
    if (fullImg && levelImages[theme]) {
        fullImg.src = levelImages[theme][size];
    }
    startGame();
};

function startGame() {
    clearInterval(interval);
    timer = 0;
    turns = 0;
    isPaused = false;

    document.getElementById("time").innerText = "0";
    document.getElementById("turns").innerText = "0";

    interval = setInterval(() => { 
        if (!isPaused) {
            timer++;
            document.getElementById("time").innerText = timer;
        }
    }, 1000);

    createBoard();
}

function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    board.style.setProperty('--columns', size);
    board.style.setProperty('--rows', size);

    let order = Array.from({length: size * size}, (_, i) => i + 1);
    shuffle(order);

    order.forEach((num, i) => {
        let tile = document.createElement("img");

        tile.id = `${Math.floor(i/size)}-${i%size}`;
        tile.src = `images/${theme}/L${size}/${num}.jpg`;

        tile.addEventListener("dragstart", () => currTile = tile);
        tile.addEventListener("dragover", e => e.preventDefault());
        tile.addEventListener("drop", () => otherTile = tile);
        tile.addEventListener("dragend", dragEnd);

        board.append(tile);
    });
}


function checkWin() {
    const tiles = document.querySelectorAll("#board img");

    for (let i = 0; i < tiles.length; i++) {
        if (!tiles[i].src.includes(`/${i + 1}.jpg`)) {
            return false;
        }
    }
    return true;
}

function triggerWin() {
    clearInterval(interval);

    document.getElementById("finalTime").innerText = timer + "s";
    document.getElementById("finalTurns").innerText = turns;

    let key = `${theme}_${size}x${size}`;

    let bestTime = localStorage.getItem(key + "_time");
    let leastMoves = localStorage.getItem(key + "_moves");

    if (!bestTime || timer < bestTime) {
        bestTime = timer;
        localStorage.setItem(key + "_time", timer);
    }

    if (!leastMoves || turns < leastMoves) {
        leastMoves = turns;
        localStorage.setItem(key + "_moves", turns);
    }

    document.getElementById("bestTime").innerText = bestTime + "s";
    document.getElementById("leastMoves").innerText = leastMoves;

    const overlay = document.getElementById("overlay");
    overlay.classList.remove("hidden");
    setTimeout(() => overlay.classList.add("show"), 10);
}

function dragEnd() {
    if (!otherTile || !currTile) return;

    // blank tile check (1.jpg)
    if (!otherTile.src.includes("/1.jpg")) return;

    let [r, c] = currTile.id.split("-").map(Number);
    let [r2, c2] = otherTile.id.split("-").map(Number);

    if (Math.abs(r - r2) + Math.abs(c - c2) === 1) {
        let temp = currTile.src;
        currTile.src = otherTile.src;
        otherTile.src = temp;

        turns++;
        document.getElementById("turns").innerText = turns;

       
        if (checkWin()) {
            triggerWin();
        }
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

function togglePause() {
    const pauseOverlay = document.getElementById("pauseOverlay");
    const pauseBtn = document.getElementById("pauseBtn");

    isPaused = !isPaused;

    if (isPaused) {
        pauseBtn.innerText = "▶️ Resume";
        pauseOverlay.classList.remove("hidden");
        setTimeout(() => pauseOverlay.classList.add("show"), 10);
    } else {
        pauseBtn.innerText = "⏸️ Pause";
        pauseOverlay.classList.remove("show");
        setTimeout(() => pauseOverlay.classList.add("hidden"), 300);
    }
}

function restartGame() {
    document.getElementById("overlay").classList.remove("show");

    setTimeout(() => {
        document.getElementById("overlay").classList.add("hidden");
        startGame();
    }, 300);
}

function goHome() {
    window.location.href = "index.html";
}

function nextLevel() {
    let nextSize = size + 1;

    if (nextSize > 6) {
        goHome();
        return;
    }

    window.location.href = `gameboard.html?theme=${theme}&size=${nextSize}`;
}


function applyMode(mode){
    if(mode === "light"){
        document.body.classList.add("light");
    } else {
        document.body.classList.remove("light");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const mode = localStorage.getItem("mode") || "dark";
    applyMode(mode);
});