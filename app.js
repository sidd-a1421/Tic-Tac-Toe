const btns = document.querySelectorAll('.btn');
const score = document.querySelector('.result');
const resetBtn = document.querySelector('.reset');
const teamO = document.querySelector('.teamO');
const teamX = document.querySelector('.teamX');

let turnO = true;

let trackO = [];
let trackX = [];

let oScore = 0;
let xScore = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];


const lineStyles = {
  "0,1,2": { top: "48px", left: "8px", width: "290px", rotate: "0deg" },
  "3,4,5": { top: "153px", left: "8px", width: "290px", rotate: "0deg" },
  "6,7,8": { top: "258px", left: "8px", width: "290px", rotate: "0deg" },
  "0,3,6": { top: "0", left: "50px", width: "310px", rotate: "90deg" },
  "1,4,7": { top: "0", left: "155px", width: "310px", rotate: "90deg" },
  "2,5,8": { top: "0", left: "260px", width: "310px", rotate: "90deg" },
  "0,4,8": { top: "10px", left: "10px", width: "420px", rotate: "45deg" },
  "2,4,6": { top: "0", left: "310px", width: "420px", rotate: "135deg" }
};

function getWinningPattern(tracker) {
    return winningPatterns.find(pattern =>
        pattern.every(pos => tracker.includes(pos.toString()))
    );
}


function disableAllButtons() {
    btns.forEach(btn => {
        btn.disabled = true;
    });
}

function drawWinLine(pattern) {
  const key = pattern.sort((a, b) => a - b).join(",");
  const style = lineStyles[key];
  const line = document.getElementById("win-line");

  if (style) {
    line.style.top = style.top;
    line.style.left = style.left;
    line.style.width = style.width;
    line.style.transform = `rotate(${style.rotate})`;
  }
}



btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (turnO) {
            btn.textContent = 'O';
            btn.disabled = true;
            turnO = false;
            trackO.push(btn.dataset.index);
            const pattern = getWinningPattern(trackO);
            if (trackO.length >= 3 && pattern) {
                oScore++;
                teamO.textContent=`${oScore}`;
                score.textContent = 'O Wins';
                drawWinLine(pattern);
                disableAllButtons();
            }
        }
        else {
            btn.textContent = 'X';
            btn.disabled = true;
            turnO = true;
            trackX.push(btn.dataset.index);
            const pattern = getWinningPattern(trackX);
            if (trackX.length >= 3 && pattern) {
                xScore++;
                teamX.textContent=`${xScore}`;
                score.textContent = 'X Wins';
                drawWinLine(pattern);
                disableAllButtons();
            }
        }
    })
});


resetBtn.addEventListener('click', () => {
    score.textContent = '';
    document.getElementById("win-line").style.width = "0";
    turnO = true;
    trackO = [];
    trackX = [];
    btns.forEach(btn => {
        btn.textContent = '';
        btn.disabled = false;
    });
})

