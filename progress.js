function openRecord(){
    document.getElementById("theme-selection").classList.add("hidden");
    document.getElementById("progressPage").classList.remove("hidden");

    document.getElementById("progressTheme").value = selectedTheme || "shinchan";
    loadProgressByTheme();
}

function closeRecord(){
    document.getElementById("progressPage").classList.add("hidden");
    document.getElementById("theme-selection").classList.remove("hidden");
}

function loadProgressByTheme(){
    const theme = document.getElementById("progressTheme").value;

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
        document.getElementById(lvl.m).innerText = moves ?? "---";

        if(time) completed++;
    });

    document.getElementById("levelsDone").innerText = completed + " / 4";
}
