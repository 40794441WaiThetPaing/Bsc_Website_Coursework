/* =========================
   MODE
========================= */
function applyMode(mode){
    document.body.classList.toggle("light", mode === "light");
}

function setMode(mode){
    localStorage.setItem("mode", mode);
    applyMode(mode);
}


function clearProgressHistory() {

    const themes = ["shinchan","spongebob","familyguy","tomjerry","scoobydoo","oggy"];
    const sizes = [3,4,5,6];

    themes.forEach(theme => {
        sizes.forEach(size => {
            let key = `${theme}_${size}x${size}`;

            localStorage.removeItem(key + "_time");
            localStorage.removeItem(key + "_moves");
        });
    });

    showToast("🗑️ records cleared!");

}

/* =========================
   TOAST
========================= */
function showToast(message){
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* =========================
   MUSIC SYSTEM 🎵
========================= */
let musicOn = localStorage.getItem("music") !== "off";

window.addEventListener("DOMContentLoaded", () => {

    applyMode(localStorage.getItem("mode") || "dark");

    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");

    if (!bgMusic) return;

    // Restore time
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    // Auto play if ON
    if (musicOn) {
        bgMusic.play().catch(()=>{});
    }

    // Save time
    setInterval(() => {
        if (!bgMusic.paused) {
            localStorage.setItem("musicTime", bgMusic.currentTime);
        }
    }, 1000);

    // Button toggle
    if (musicBtn) {
        updateMusicButton(musicBtn);

        musicBtn.addEventListener("click", () => {
            musicOn = !musicOn;
            localStorage.setItem("music", musicOn ? "on" : "off");

            if (musicOn) {
                bgMusic.play().catch(()=>{});
            } else {
                bgMusic.pause();
            }

            updateMusicButton(musicBtn);
        });
    }

    // Fix autoplay restriction
    document.addEventListener("click", () => {
        if (musicOn && bgMusic.paused) {
            bgMusic.play().catch(()=>{});
        }
    }, { once: true });

});

/* =========================
   BUTTON UI UPDATE
========================= */
function updateMusicButton(btn){
    btn.innerHTML = musicOn ? "🎵 ON" : "🔇 OFF";
}