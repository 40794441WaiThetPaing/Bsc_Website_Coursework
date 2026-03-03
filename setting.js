
function openSettings(){
    document.getElementById("theme-selection").classList.add("hidden");
    document.getElementById("settingsPage").classList.remove("hidden");
}

function closeSettings(){
    document.getElementById("settingsPage").classList.add("hidden");
    document.getElementById("theme-selection").classList.remove("hidden");
}

function clearSavedTheme(){
    selectedTheme = "";
}

function clearBestScores(){
    Object.keys(localStorage).forEach(key=>{
        if(key.endsWith("_time") || key.endsWith("_moves")){
            localStorage.removeItem(key);
        }
    });
 
}

function clearProgressHistory(){
    Object.keys(localStorage).forEach(key=>{
        if(key.includes("_")){
            localStorage.removeItem(key);
        }
    });
  
}