let player = JSON.parse(localStorage.getItem("ThisPlayer"));
const answers_container = document.getElementById('answers_container');
const questions_container = document.getElementById('questions_container');
const options_container = document.getElementById('options_container');
const a_1 = document.getElementById('a_1');
const a_2 = document.getElementById('a_2');
const a_3 = document.getElementById('a_3');

const win = document.getElementById('win');

const lose = document.getElementById('lose');
const exit = document.getElementById('exit');
let cl = null;
let draggedItem = null;
let sc = document.getElementById('score');
const check = document.getElementById('check');
const restart = document.getElementById('restart');

let set = [1, 2, 3];
let num_set = 0;
set.sort(compareRandom);
let question_1 = ["Равносторонний","Равнобедренный","Прямоугольный"];
let question_2 = ["Квадрат","Прямоугольник","Параллелограмм"];
let question_3 = ["Круг","Окружность","Овал"];

let this_question = ["","",""];
let this_answers = ["","",""];
let questions_count = 3;
let answers_count = 3;
let num_var_answer;
let num_question;
let score = 0;
preparation();

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

function preparation()
{
    const div = document.createElement('div');
    let text = String(score);
    div.textContent = text;
    div.id = "s";
    sc.appendChild(div);
    repeat();
    if (num_set===0) start();
}

function repeat()
{
    num_question = set[num_set];
    switch (num_question) {
        case 1: this_question[0] = question_1[0];
            this_question[1] = question_1[1];
            this_question[2] = question_1[2];
            break;
        case 2: this_question[0] = question_2[0];
            this_question[1] = question_2[1];
            this_question[2]= question_2[2];
            break;
        case 3: this_question[0] = question_3[0];
            this_question[1] = question_3[1];
            this_question[2] = question_3[2];
            break;
    }
    this_question.sort(compareRandom);
    for (let i =0; i<questions_count; i++) {
        switch (this_question[i]) {
            case "Равносторонний": this_answers[i] = "o_1"; break;
            case "Равнобедренный": this_answers[i] = "o_2"; break;
            case "Прямоугольный": this_answers[i] = "o_3"; break;
            case "Квадрат": this_answers[i] = "o_4"; break;
            case "Прямоугольник": this_answers[i] = "o_5"; break;
            case "Параллелограмм": this_answers[i] = "o_6"; break;
            case "Круг": this_answers[i] = "o_7"; break;
            case "Окружность": this_answers[i] = "o_8"; break;
            case "Овал": this_answers[i] = "o_9"; break;
        }
    }

    for (let i =0; i<questions_count; i++){
        const div = document.createElement('div');
        div.classList.add('question');
        div.textContent = this_question[i];
        div.id = this_question[i];
        questions_container.appendChild(div);
    }

    a_1.setAttribute('answer', this_answers[0]);
    a_1.setAttribute('block', '0');
    a_2.setAttribute('answer', this_answers[1]);
    a_2.setAttribute('block', '0');
    a_3.setAttribute('answer', this_answers[2]);
    a_3.setAttribute('block', '0');

    this_answers.sort(compareRandom);

    for (let i =0; i<answers_count; i++){
        const div = document.createElement('div');
        const div1 = document.createElement('div');
        let text = this_answers[i];
        div1.id = text;
        div.appendChild(div1);
        div.classList.add('option');
        div.draggable = true;
        div.addEventListener('dragstart', (event) => {
            draggedItem = div;
            setTimeout(() => {
                div.style.display = 'none';
            }, 0);
        });
        div.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
        div.setAttribute('text', text);
        options_container.appendChild(div);
    }
}

a_1.addEventListener('drop', (event) => {
    event.preventDefault();
    if (a_1.querySelector('.option') === null) a_1.appendChild(draggedItem);
});

a_1.addEventListener('dragover', (e) => {
    e.preventDefault();
});

a_2.addEventListener('drop', (event) => {
    event.preventDefault();
    if (a_2.querySelector('.option') === null) a_2.appendChild(draggedItem);
});

a_2.addEventListener('dragover', (e) => {
    e.preventDefault();
});

a_3.addEventListener('drop', (event) => {
    event.preventDefault();
    if (a_3.querySelector('.option') === null) a_3.appendChild(draggedItem);
});

a_3.addEventListener('dragover', (e) => {
    e.preventDefault();
});

check.addEventListener('click', (e) => {
    e.preventDefault();
    let c1, c2, c3;
    try {c1=check1(a_1);} catch {c1=-1};
    try {c2=check1(a_2);} catch {c2=-1};
    try {c3=check1(a_3);} catch {c3=-1};
    if (c1<0||c2<0||c3<0) {
        try {wr_answer(a_1);} catch{};
        try {wr_answer(a_2);} catch{};
        try {wr_answer(a_3);} catch{};
    }
    else if(c1+c2+c3===3){
        let tmp_score = 0;
        if (a_1.getAttribute('block') !=='1')
        {
            r_answer(a_1);
            tmp_score+=2;
        }
        if (a_2.getAttribute('block') !=='1')
        {
            r_answer(a_2);
            tmp_score+=2;
        }
        if (a_3.getAttribute('block') !=='1')
        {
            r_answer(a_3);
            tmp_score+=2;
        }
        if (tmp_score <6) tmp_score/=2;
        change_score(tmp_score);
        if (num_set<questions_count-1) setTimeout(next_question, 500);
        else if (score>0) setTimeout(win_level, 500);
        else setTimeout(lose_level, 500);
    }
    else {
        if (c1===1) {
            r_answer(a_1);
            a_1.setAttribute('block', '1');
            change_score(1)
        }
        else wr_answer(a_1);
        if (c2===1) {
            r_answer(a_2);
            a_2.setAttribute('block', '1');
            change_score(1)
        }
        else wr_answer(a_2);
        if (c3===1) {
            r_answer(a_3);
            a_3.setAttribute('block', '1');
            change_score(1)
        }
        else wr_answer(a_3);
    }
});

restart.addEventListener('click', (e) => {
    e.preventDefault();
    try {wr_answer(a_1);} catch{};
    try {wr_answer(a_2);} catch{};
    try {wr_answer(a_3);} catch{};
});

function check1(a){
    let child1 = a.querySelector('.option');
    let asw = a.getAttribute('answer');
    let opt = child1.getAttribute('text');
    if (asw === opt) return 1;
    else return 0;
}

function r_answer(a){
    let child1 = a.querySelector('.option');
    a.style.backgroundColor = 'green';
    child1.draggable = false;
}
function wr_answer(a){
    let child = a.querySelector('.option');
    a.removeChild(child);
    a.style.backgroundColor = 'darkorange';
    options_container.appendChild(child);
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
        if (remain < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "Время вышло!";
            lose_level();
        }
    }, 500);
}

function next_question(){
    for (let i=0; i<questions_count; i++){
        const div = document.getElementById(this_question[i]);
        questions_container.removeChild(div);
    }
    let child = a_1.querySelector('.option');
    a_1.removeChild(child);
    a_1.style.backgroundColor = 'darkorange';
    child = a_2.querySelector('.option');
    a_2.removeChild(child);
    a_2.style.backgroundColor = 'darkorange';
    child = a_3.querySelector('.option');
    a_3.removeChild(child);
    a_3.style.backgroundColor = 'darkorange';
    num_set++;
    repeat();
}

function win_level() {
    win.classList.remove('hidden');
    player.scores[2] = score;
    localStorage.setItem("ThisPlayer", JSON.stringify(player));
    const div = document.createElement('div');
    let text = "Ты набрал " + score + " баллов и прошел всю игру! Свой рейтинг ты сможешь посмотреть на странице уровней";
    div.textContent = text;
    win.appendChild(div);
    rating();
}

function lose_level() {
    lose.classList.remove('hidden');
    const div = document.createElement('div');
    let text = "Ты не смог пройти уровень, придется вернуться к нему снова";
    div.textContent = text;
    lose.appendChild(div);
}

function rating (){
    let f = JSON.parse(localStorage.getItem("f_place"));
    let s = JSON.parse(localStorage.getItem("s_place"));
    let t = JSON.parse(localStorage.getItem("t_place"));
    let sum = 0;
    for (let i = 0; i<player.scores.length; i++){
        sum += Number(player.scores[i]);
    }
    if ((f===null)||(sum > f.score)){
        try {
            t.name = s.name;
            t.score = s.score;
            localStorage.setItem("t_place", JSON.stringify(t));
        }
        catch {
            if(s != null) {
                const p = {
                    name: s.name,
                    score: s.score,
                };
                localStorage.setItem("t_place", JSON.stringify(p));
            }
        }
        try {
            s.name = f.name;
            s.score = f.score;
            localStorage.setItem("s_place", JSON.stringify(s));
        }
        catch {
            if(f != null) {
                const p = {
                    name: f.name,
                    score: f.score,
                };
                localStorage.setItem("s_place", JSON.stringify(p));
            }
        }
        try {
            f.name = player.name;
            f.score = sum;
            localStorage.setItem("f_place", JSON.stringify(f));
        }
        catch {
            if (f === null) {
                const p= {
                    name: player.name,
                    score: sum,
                };
                localStorage.setItem("f_place", JSON.stringify(p));
            }
        }
    }

    else if ((s===null)||(sum > s.score)){
        try {
            t.name = s.name;
            t.score = s.score;
            localStorage.setItem("t_place", JSON.stringify(t));
        }
        catch {
            if(s != null) {
                const p = {
                    name: s.name,
                    score: s.score,
                };
                localStorage.setItem("t_place", JSON.stringify(p));
            }
        }
        try {
            s.name = player.name;
            s.score = sum;
            localStorage.setItem("s_place", JSON.stringify(s));
        }
        catch {
            if (s === null) {
                const p = {
                    name: player.name,
                    score: sum,
                };
                localStorage.setItem("s_place", JSON.stringify(p));
            }
        }
    }
    else if ((t===null)||(sum > t.score)){
        try {
            t.name = player.name;
            t.score = sum;
            localStorage.setItem("t_place", JSON.stringify(t));
        }
        catch {
            if (t === null) {
                const p = {
                    name: player.name,
                    score: sum,
                };
                localStorage.setItem("t_place", JSON.stringify(p));
            }
        }
    }
}





