let player = JSON.parse(localStorage.getItem("ThisPlayer"));
const lev1 = document.getElementById('l_1');
const lev2 = document.getElementById('l_2');
const lev3 = document.getElementById('l_3');
let f = JSON.parse(localStorage.getItem("f_place"));
let s = JSON.parse(localStorage.getItem("s_place"));
let t = JSON.parse(localStorage.getItem("t_place"));


const LevMass = [lev1, lev2, lev3];

for (let i=0; i<player.scores.length; i++){
    if (player.scores[i] === 0){
        for (let j = i+1; j<player.scores.length; j++){
            LevMass[j].classList.add("not_avalible");
        }
        LevMass[i].classList.remove("finished");
        LevMass[i].classList.add("not_finished");
        break;
    }
    else {
        LevMass[i].classList.add("finished");
    }
}

const hitext = document.getElementById('hello-name');
hitext.innerHTML = `Привет, ${player.name}!`;

let n;
let sc;
let txt;
let parent = document.querySelector('#f_place');
try {
    n = f.name;
    sc = f.score;
}
catch {
    n = " ";
    sc = " ";
}
txt = "1 место";
rate(parent, n, sc, txt);

parent = document.querySelector('#s_place');
try {
    n = s.name;
    sc = s.score;
}
catch {
    n = " ";
    sc = " ";
}
txt = "2 место";
rate(parent, n, sc, txt);

parent = document.querySelector('#t_place');
try {
    n = t.name;
    sc = t.score;
}
catch {
    n = " ";
    sc = " ";
}
txt = "3 место";
rate(parent, n, sc, txt);


parent = document.querySelector('#player');
let scoresum = 0;
for (let i = 0; i<player.scores.length; i++){
    {scoresum += Number(player.scores[i])};
}
n = player.name;
sc = scoresum;
txt = "Текущий игрок";
rate(parent, n, sc, txt);

function rate(parent, n, s, txt) {
    let child = document.createElement('div');
    child.style.color = "8B0000FF";
    child.style.fontSize = "30px";
    let p = document.createElement('p');
    p = document.createTextNode(txt);
    child.appendChild(p);
    parent.appendChild(child);
    let child1 = document.createElement('div');
    child1.style.color = "8B0000FF";
    child1.style.fontSize = "30px";
    let tmp = n + '-' + s;
    p = document.createTextNode(tmp);
    child1.appendChild(p);
    parent.appendChild(child1);
}

//localStorage.clear();