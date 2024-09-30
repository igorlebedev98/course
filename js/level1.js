let player = JSON.parse(localStorage.getItem("ThisPlayer"));
const answers_container = document.getElementById('answers');
const question_container = document.getElementById('question_area');

const win = document.getElementById('win');
const lose = document.getElementById('lose');
const exit = document.getElementById('exit');
let cl = null;
let sc = document.getElementById('score');


let set = [1, 2, 3, 4];
let num_set = 0;
set.sort(compareRandom);
let questions = ["Выберите фигуру, у которой все стороны всегда равны",
                "Выберите фигуру, у которой нет ни одного угла",
                "Выберите фигуру с четырьмя углами, ни один из которых не прямой",
                "Выберите фигуру, у которой нечетное количество углов"];
let answers = [["квадрат", "ромб", "ромб"],
                ["круг", "круг", "овал"],
                ["параллелограмм", "ромб", "ромб"],
                ["треугольник", "треугольник", "пятиугольник"]];
let var_answers = [["квадрат", "круг", "треугольник", "параллелограмм"],
                ["ромб", "круг", "треугольник", "прямоугольник"],
                ["прямоугольник", "овал", "ромб", "пятиугольник"]];
let var_answers_count = 3;
let questions_count = 4;
let answers_count = 4;
let num_var_answer;
let num_question;
let right_answer;
let this_var_answers = [];
let score = 0;
preparation();


function compareRandom(a, b) {
    return Math.random() - 0.5;
}
function getRandomInt(max) {
    return Math.ceil(Math.random() * max);
}

function preparation()
{

    const div = document.createElement('div');
    let text = String(score);
    div.textContent = text;
    div.id = "s";
    sc.appendChild(div);
    num_var_answer = getRandomInt(var_answers_count)-1;
    num_question = set[num_set]-1;
    right_answer = answers[num_question][num_var_answer];
    for (let i =0; i<answers_count; i++){
        this_var_answers[i] = var_answers[num_var_answer][i];
    }
    this_var_answers.sort(compareRandom);
    const q_div = document.createElement('div');
    q_div.textContent = questions[num_question];
    q_div.id = 'question';
    question_container.appendChild(q_div);
    let tmp = 1;
    this_var_answers.forEach(answer =>
    {
        const div = document.createElement('div');
        div.classList.add('answer');
        if (answer !== right_answer) {
            div.setAttribute('right', '0');
            //const data = div.getAttribute('right');
        }
        else div.setAttribute('right', '1');
        div.setAttribute('click', '0');
        div.textContent = answer;
        div.id = String(tmp);
        tmp++;
        answers_container.appendChild(div);
    });
    if (num_set===0) start();
}


answers_container.addEventListener('click', (event) => {
    cl = document.getElementById(event.target.id);
    if (cl.getAttribute('click') === '0') {
        const data = cl.getAttribute('right');
        check(data);
    }
});

function check(data) {
    if (data === '1') {
        r_answer();
        if (num_set<questions_count-1) setTimeout(next_question, 500);
        else if (score>0) setTimeout(win_level, 500);
        else lose_level();
    } else {
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
    const qq_div = document.getElementById('question');
    try {
        question_container.removeChild(qq_div);
    } catch {};
    const div_1 = document.getElementById('1');
    const div_2 = document.getElementById('2');
    const div_3 = document.getElementById('3');
    const div_4 = document.getElementById('4');
    try {
        answers_container.removeChild(div_1);
        answers_container.removeChild(div_2);
        answers_container.removeChild(div_3);
        answers_container.removeChild(div_4);
    } catch {};
    num_set++;
    num_var_answer = getRandomInt(var_answers_count)-1;
    num_question = set[num_set]-1;
    right_answer = answers[num_question][num_var_answer];
    for (let i =0; i<answers_count; i++){
        this_var_answers[i] = var_answers[num_var_answer][i];
    }
    this_var_answers.sort(compareRandom);
    const q_div = document.createElement('div');
    q_div.textContent = questions[num_question];
    q_div.id = 'question';
    question_container.appendChild(q_div);
let tmp = 1;
this_var_answers.forEach(answer =>
{
    const div = document.createElement('div');
    div.classList.add('answer');
    if (answer !== right_answer) {
        div.setAttribute('right', '0');
    }
    else div.setAttribute('right', '1');
    div.setAttribute('click', '0');
    div.textContent = answer;
    div.id = String(tmp);
    tmp++;
    answers_container.appendChild(div);
});
}

function win_level() {
    win.classList.remove('hidden');
    player.scores[0] = score;
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
    const div1 = document.getElementById('s');
    sc.removeChild(div1);
    score -=1;
    const div = document.createElement('div');
    let text = String(score);
    div.textContent = text;
    div.id = "s";
    sc.appendChild(div);
    cl.style.backgroundColor = 'red';
    cl.setAttribute('click', '1');
}

function r_answer() {
    const div1 = document.getElementById('s');
    sc.removeChild(div1);
    score +=2;
    const div = document.createElement('div');
    let text = String(score);
    div.textContent = text;
    div.id = "s";
    sc.appendChild(div);
    cl.style.backgroundColor = 'green';
}




