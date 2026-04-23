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

/* =========================
   MUSIC SYSTEM 🎵
========================= */
let musicOn = localStorage.getItem("music") !== "off";

window.addEventListener("DOMContentLoaded", () => {

    /* APPLY MODE */
    applyMode(localStorage.getItem("mode") || "dark");

    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");

    if (!bgMusic) return;

    /* Restore music time */
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    /* Play if ON */
    if (musicOn) {
        bgMusic.play().catch(()=>{});
    }

    /* Save time every second */
    setInterval(() => {
        if (!bgMusic.paused) {
            localStorage.setItem("musicTime", bgMusic.currentTime);
        }
    }, 1000);

    /* Button control */
    if (musicBtn) {
        musicBtn.innerHTML = musicOn ? "🎵 ON" : "🔇 OFF";

        musicBtn.addEventListener("click", () => {
            musicOn = !musicOn;
            localStorage.setItem("music", musicOn ? "on" : "off");

            if (musicOn) {
                bgMusic.play().catch(()=>{});
            } else {
                bgMusic.pause();
            }

            musicBtn.innerHTML = musicOn ? "🎵 ON" : "🔇 OFF";
        });
    }

    /* 🔥 FIX: allow autoplay after first click */
    document.addEventListener("click", () => {
        if (musicOn && bgMusic.paused) {
            bgMusic.play().catch(()=>{});
        }
    }, { once: true });

});