const playbutton = document.getElementById('play-button');
//localStorage.clear();

playbutton.onclick = function () {
    let username = "Безымянный";
    try {
        username = document.getElementById('input').value;
        if(username == "")
        {
            username = "Безымянный";
        }
    } catch {
        username = "Безымянный";
    }
    localStorage.removeItem('ThisPlayer');
    const thisplayer = {
        name: username,
        scores: [0, 0, 0],
    };
    localStorage.setItem("ThisPlayer", JSON.stringify(thisplayer));
};

