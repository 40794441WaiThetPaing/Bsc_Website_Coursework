// ✅ SAVE BEST SCORE
function saveProgress(theme, size, time, moves){
    let key = `${theme}_${size}x${size}`;

    let bestTime = localStorage.getItem(key + "_time");
    let bestMoves = localStorage.getItem(key + "_moves");

    // Save BEST TIME
    if(!bestTime || time < parseInt(bestTime)){
        localStorage.setItem(key + "_time", time);
    }

    // Save LEAST MOVES
    if(!bestMoves || moves < parseInt(bestMoves)){
        localStorage.setItem(key + "_moves", moves);
    }
}

// ✅ LOAD RECORDS
function loadProgressByTheme(){
    const theme = document.getElementById("progressTheme").value;

    // remember last theme
    localStorage.setItem("lastTheme", theme);

    const levels = [
        { r:3, t:"eTime", m:"eMoves" },
        { r:4, t:"mTime", m:"mMoves" },
        { r:5, t:"hTime", m:"hMoves" },
        { r:6, t:"xTime", m:"xMoves" }
    ];

    let completed = 0;

    levels.forEach(lvl=>{
        let key = `${theme}_${lvl.r}x${lvl.r}`;
        let time = localStorage.getItem(key + "_time");
        let moves = localStorage.getItem(key + "_moves");

        document.getElementById(lvl.t).innerText = time ? time + "s" : "---";
        document.getElementById(lvl.m).innerText = moves ? moves : "---";

        if(time) completed++;
    });

    document.getElementById("levelsDone").innerText = completed + " / 4";
}

// ✅ AUTO LOAD ON PAGE OPEN
window.onload = function(){
    let savedTheme = localStorage.getItem("lastTheme") || "shinchan";
    document.getElementById("progressTheme").value = savedTheme;

    loadProgressByTheme();
};