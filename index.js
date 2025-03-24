const Dir = { x: 0, y: 0 };
const foodsound = new Audio('background music.mp3');
const gameOverSound = new Audio('game-over-275058.mp3');
const moveSound = new Audio('direction.mp3');

let speed = 10;
let score = 0;
let lastPrintTime = 0;
let inputDir = { x: 0, y: 1 };

let snakeArr = [{ x: 13, y: 15 }];
 let food = { x: 6, y: 5 };

const board = document.getElementById('board'); 

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    
    if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPrintTime = ctime;
    gameEngine();
}
function isCollide(sarr) {
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }
    return false;
}

    
    
    


function gameEngine() {
    if(isCollide(snakeArr)){
        gameOverSound.pause();
        
        inputDir = { x: 0, y: 0 };
        alert("Game Over.Press any key to play again!");

        snakeArr = [{ x: 13, y: 15 }];
       gameOverSound.play();
        score = 0;

    }
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
       foodsound.play();
       score +=1;
       if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))
        hiscoreBox.innerHTML = "Hiscore:" + hiscoreval;
       }
       scoreBox.innerHTML="score: "+ score  ;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y }); // Fixed snake growth
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
         let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x; 
        snakeElement.classList.add('snake');
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement); 
    });
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y; 
    foodElement.style.gridColumnStart = food.x; 
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
let hiscore = localStorage.getItem("hiscore");
const hiscoreBox = document.getElementById('hiscoreBox');

if (hiscore == null) {
    hiscoreval = 0;

    localStorage.setItem("hiscore" , JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    scoreBox.innerHTML = "Score: " + score;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();

    // Prevent reversing direction
    if ((e.key === "ArrowUp" && inputDir.y === 1) || 
        (e.key === "ArrowDown" && inputDir.y === -1) || 
        (e.key === "ArrowLeft" && inputDir.x === 1) || 
        (e.key === "ArrowRight" && inputDir.x === -1)) {
        return;
    }

    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
    }
});
