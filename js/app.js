/*all reference here*/
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./assets/fruitEat.mp3");
const gameOverSound = new Audio("./assets/lost.mp3");
const gameWinSound = new Audio("./assets/win sound.mp3");
const runningScore = document.getElementById("runnigScore");

// some untitle variables
let speed = 6;
let lastCurrentTime = 0;
let snakeArr = [{ x: 9, y: 17 }];
let food = { x: 6, y: 7 };
let score = 0;

/* The main function - for all main logic here*/
function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastCurrentTime) / 1000 < 1 / speed) {
    return;
  }
  lastCurrentTime = currentTime;
  gameEngine();
}

/*The snake game engine in this function*/
function isCollide(snakeArr) {
  // if you bump your self
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }

  // if you bump the wall
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  /*updating the snake array and food*/

  //if snake crash in wall
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over!! Press any key to restart game.");
    snakeArr = [{ x: 9, y: 17 }];
    score = 0;
    runningScore.innerHTML = `Score: ${score}`;
  }

  //If snake have eaten the, increment score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    runningScore.innerHTML = `Score: ${score}`;
    if (score > highScore) {
      getScore = score;
      localStorage.setItem("HighScore", JSON.stringify(getScore));
      document.getElementById(
        "highScore"
      ).innerHTML = `High Score: ${getScore}`;
    }
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  /*display the snake array and food*/
  body.innerHTML = "";
  snakeArr.forEach((element, index) => {
    let snakeHead = document.createElement("div");

    snakeHead.style.gridRowStart = element.y;
    snakeHead.style.gridColumnStart = element.x;
    if (index === 0) {
      snakeHead.classList.add("head");
    } else {
      snakeHead.classList.add("snake");
    }
    body.appendChild(snakeHead);
  });

  // display the food for snake
  let snakeFood = document.createElement("div");
  snakeFood.style.gridRowStart = food.y;
  snakeFood.style.gridColumnStart = food.x;
  snakeFood.classList.add("food");
  body.appendChild(snakeFood);
}

/*The game main function here*/
let highScore = localStorage.getItem("HighScore");

if (highScore === null) {
  getScore = 0;
  localStorage.setItem("HighScore", JSON.stringify(getScore));
} else {
  getScore = JSON.parse(highScore);
  document.getElementById("highScore").innerHTML = `High Score: ${highScore}`;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // starting the game

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
