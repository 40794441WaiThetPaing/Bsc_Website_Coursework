function setTheme(theme){
    localStorage.setItem("lastTheme", theme);
    showToast("Theme updated: " + theme);
}

function getSelectedTheme(){
    return localStorage.getItem("lastTheme") || "shinchan";
}

function clearProgressHistory(){
    const theme = getSelectedTheme();

    Object.keys(localStorage).forEach(key=>{
        if(key.startsWith(theme + "_")){
            localStorage.removeItem(key);
        }
    });

    showToast("Progress cleared for " + theme);
}

/* ===== Toast system ===== */
function showToast(message){
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2000);
}

/* ===== Load saved theme ===== */
window.onload = function(){
    const theme = getSelectedTheme();
    const select = document.getElementById("themeSelect");
    if(select) select.value = theme;
};


/* ===== SET MODE ===== */
function setMode(mode){
    localStorage.setItem("mode", mode);
    applyMode(mode);
    showToast("Mode changed: " + mode);
}

/* ===== APPLY MODE ===== */
function applyMode(mode){
    if(mode === "light"){
        document.body.classList.add("light");
    } else {
        document.body.classList.remove("light");
    }

    const select = document.getElementById("modeSelect");
    if(select) select.value = mode;
}

/* ===== LOAD ON START ===== */
window.onload = function(){
    const mode = localStorage.getItem("mode") || "dark";
    applyMode(mode);

    const theme = localStorage.getItem("lastTheme") || "shinchan";
    const themeSelect = document.getElementById("themeSelect");
    if(themeSelect) themeSelect.value = theme;
};