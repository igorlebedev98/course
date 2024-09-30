let player = JSON.parse(localStorage.getItem("ThisPlayer"));
const checking = document.getElementById('checking');
const input = document.getElementById('input');

const win = document.getElementById('win');
const lose = document.getElementById('lose');
const exit = document.getElementById('exit');
const q_0 = document.getElementById('q_0');
const q_1 = document.getElementById('q_1');
const q_2 = document.getElementById('q_2');
const q_3 = document.getElementById('q_3');
let sc = document.getElementById('score');


let set = ["куб", "цилиндр", "шар", "конус"];
let num_set = 0;
set.sort(compareRandom);
let right_answer;
let questions_count = 4;
let score = 0;
preparation();


function compareRandom(a, b) {
    return Math.random() - 0.5;
}
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function close_question(a){
    switch(a)
    {
        case "куб":     q_0.classList.add('hidden'); break;
        case "цилиндр":     q_1.classList.add('hidden'); break;
        case "шар":     q_2.classList.add('hidden'); break;
        case "конус":     q_3.classList.add('hidden'); break;
    }
}

function open_question(a){
    switch(a)
    {
        case "куб":     q_0.classList.remove('hidden'); break;
        case "цилиндр":     q_1.classList.remove('hidden'); break;
        case "шар":     q_2.classList.remove('hidden'); break;
        case "конус":     q_3.classList.remove('hidden'); break;
    }
}

function preparation()
{
    const div = document.createElement('div');
    let text = String(score);
    div.textContent = text;
    div.id = "s";
    sc.appendChild(div);
    right_answer = set[num_set];
    open_question(right_answer);
    if (num_set===0) start();
}


checking.addEventListener('click', (event) => {
    event.preventDefault();
    let word = document.getElementById('input').value.toLowerCase();
    if (word !== "") {
        check(word);
    }
});

function check(data) {
    if (data === right_answer) {
        r_answer();
        if (num_set<questions_count-1) setTimeout(next_question, 500);
        else if (score>0) setTimeout(win_level, 500);
        else lose_level();
    }
    else {
        wr_answer();
    }
}

function start() {
    exit.classList.remove('hidden');
    var start_time = new Date();
    var stop_time = start_time.setMinutes(start_time.getMinutes() + 3);
    var countdown = setInterval(function() {
        var now = new Date().getTime();
        var remain = stop_time - now;
        var min = Math.floor( (remain % (1000 * 60 * 60)) / (1000 * 60) );
        var sec = Math.floor( (remain % (1000 * 60)) / 1000 );
        sec = sec < 10 ? "0" + sec : sec;
        document.getElementById("countdown").innerHTML = min + ":" + sec;
        if (check === 1) clearInterval(countdown);
        if (remain < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "Время вышло!";
            if (check ===0) lose_level();
        }
    }, 500);
}

function next_question(){
    num_set++;
    right_answer = set[num_set];
    open_question(right_answer);
}

function win_level() {
    win.classList.remove('hidden');
    player.scores[1] = score;
    localStorage.setItem("ThisPlayer", JSON.stringify(player));
    const div = document.createElement('div');
    let text = "Ты набрал " + score + " баллов и можешь переходить к следующему уровню";
    div.textContent = text;
    win.appendChild(div);
}

function lose_level() {
    lose.classList.remove('hidden');
    const div = document.createElement('div');
    let text = "Ты не смог пройти уровень, придется вернуться к нему снова";
    div.textContent = text;
    lose.appendChild(div);
}

function wr_answer() {
    change_score(-1);
    input.style.backgroundColor = 'red';
    setTimeout(function wr(){ input.style.backgroundColor = 'white';
        document.getElementById('input').value = "";}, 500);
    //cl.setAttribute('click', '1');
}

function r_answer() {
    change_score(2);
    input.style.backgroundColor = 'green';
    setTimeout(function wr(){ input.style.backgroundColor = 'white';
        document.getElementById('input').value = "";}, 500);
    close_question(right_answer);
    //cl.style.backgroundColor = 'green';
}

function change_score(a){
    const div1 = document.getElementById('s');
    sc.removeChild(div1);
    score += a;
    const div = document.createElement('div');
    let text = String(score);
    div.textContent = text;
    div.id = "s";
    sc.appendChild(div);
}




