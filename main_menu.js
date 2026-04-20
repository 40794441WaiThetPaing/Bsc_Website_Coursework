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

function startGame() {
    sessionStorage.setItem("enteredFromMenu", "yes");
    window.location.href = "index.html";
}

function openSettings() {
    sessionStorage.setItem("enteredFromMenu", "yes");
    window.location.href = "index.html#settingsPage";
}

function openRecords() {
    sessionStorage.setItem("enteredFromMenu", "yes");
    window.location.href = "index.html#progressPage";
}

function openHowToPlay() {
    document.getElementById("howToPlayModal").classList.remove("hidden");
}

function closeHowToPlay() {
    document.getElementById("howToPlayModal").classList.add("hidden");
}
function hideAllMenuSections() {
    document.querySelector(".menu-card").classList.add("hidden");
    document.getElementById("settingsPage").classList.add("hidden");
    document.getElementById("progressPage").classList.add("hidden");
}