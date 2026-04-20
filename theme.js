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