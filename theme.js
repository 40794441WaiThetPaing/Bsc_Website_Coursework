function applyMode(mode){
    document.body.classList.toggle("light", mode === "light");
}

function setMode(mode){
    localStorage.setItem("mode", mode);
    applyMode(mode);
}

/* run on every page load */
window.addEventListener("DOMContentLoaded", () => {
    const mode = localStorage.getItem("mode") || "dark";
    applyMode(mode);
});

const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

// load ON/OFF state
let musicOn = localStorage.getItem("music") !== "off";

// APPLY MODE (your code stays)
function applyMode(mode){
    document.body.classList.toggle("light", mode === "light");
}

function setMode(mode){
    localStorage.setItem("mode", mode);
    applyMode(mode);
}

// RUN ON LOAD
window.addEventListener("DOMContentLoaded", () => {
    const mode = localStorage.getItem("mode") || "dark";
    applyMode(mode);

    // restore music time
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    updateMusic();
});

// SAVE TIME
setInterval(() => {
    if (music && !music.paused) {
        localStorage.setItem("musicTime", music.currentTime);
    }
}, 1000);

// TOGGLE BUTTON
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        musicOn = !musicOn;
        localStorage.setItem("music", musicOn ? "on" : "off");
        updateMusic();
    });
}

// UPDATE FUNCTION
function updateMusic() {
    if (!music) return;

    if (musicOn) {
        music.play().catch(() => {});
        if (toggleBtn) {
            toggleBtn.innerText = "ON";
            toggleBtn.classList.add("on");
            toggleBtn.classList.remove("off");
        }
    } else {
        music.pause();
        if (toggleBtn) {
            toggleBtn.innerText = "OFF";
            toggleBtn.classList.add("off");
            toggleBtn.classList.remove("on");
        }
    }
}

// autoplay fix (important)
document.addEventListener("click", () => {
    if (musicOn && music.paused) {
        music.play().catch(() => {});
    }
}, { once: true });

const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const soundBtn = document.getElementById("soundToggle");

let soundOn = localStorage.getItem("sound") !== "off";

function updateSoundBtn() {
    if (!soundBtn) return;

    if (soundOn) {
        soundBtn.innerText = "ON";
        soundBtn.classList.add("on");
        soundBtn.classList.remove("off");
    } else {
        soundBtn.innerText = "OFF";
        soundBtn.classList.add("off");
        soundBtn.classList.remove("on");
    }
}

