const gameBoard= document.querySelector("#gameBoard");
const ctx= gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "black";
const paddle1Color= "white";
const paddle2Color= "white";
const paddleborder= "black";
const ballColor= "red";
const ballBorderColor= "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalId;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let playerScore = 0;
let player2Score = 0;
let paddle1={
  widht: 25,
  height :100,
  x: 0,
  y: 0
}
let paddle2={
  widht: 25,
  height :100,
  x: gameWidth - 25,
  y: gameHeight - 100
}
window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

gameStart();


function gameStart(){
  createBall();
  nextTick();
};
function nextTick(){
  intervalId = setTimeout(()=>{
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, )
};
function clearBoard(){
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0,0, gameWidth, gameHeight);
};
function drawPaddles(){
  ctx.strokeStyle = paddleborder;

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.widht, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.widht, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.widht, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.widht, paddle2.height);
};
function createBall(){
  ballSpeed = 1;
  if(Math.round(Math.random())==1){
    ballXDirection = 1;
  }
  else{
    ballXDirection = -1;
  }
  if(Math.round(Math.random())==1){
    ballYDirection = 1;
  }
  else{
    ballYDirection = -1;
  }
  ballX = gameWidth /2;
  ballY = gameHeight /2;
  drawBall(ballX,ballY);
};
function moveBall(){
  ballX += (ballSpeed * ballXDirection);
  ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx. arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
};
function checkCollision(){
  if(ballY <= 0+ballRadius){
    ballYDirection *= -1
  }
  if(ballY >= gameHeight - ballRadius){
    ballYDirection *= -1
  }
  if(ballX <= 0){
    player2Score+=1;
    updateScore();
    createBall();
    return;
  }
  if(ballX >= gameWidth){
    playerScore +=1;
    updateScore();
    createBall();
    return;
  }
  if(ballX<= (paddle1.x + paddle1.widht + ballRadius)){
    if(ballY > paddle1.y && ballY < paddle1.y +paddle1.height){
      ballX =paddle1.x +paddle1.widht + ballRadius;
      ballXDirection*= -1;
      ballSpeed +=0.2
    }
  }
  if(ballX >= (paddle2.x - ballRadius)){
    if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
      ballX =paddle2.x - ballRadius;
      ballXDirection*= -1;
      ballSpeed += 0.2
    }
  }
};
function changeDirection(){
  const keyPressed = event.keyCode;
  console.log(keyPressed);
  const paddle1Up= 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch(keyPressed){
    case(paddle1Up):
      if(paddle1.y >0){
        paddle1.y -=paddleSpeed;
      }
      break
    case(paddle1Down):
      if(paddle1.y < gameHeight-paddle1.height){
        paddle1.y +=paddleSpeed;
      }
      break
    case(paddle2Up):
      if(paddle2.y >0){
        paddle2.y -=paddleSpeed;
      }
      break
    case(paddle2Down):
      if(paddle2.y < gameHeight-paddle2.height){
        paddle2.y +=paddleSpeed;
      }
      break
  }
};
function updateScore(){
  scoreText.textContent = `${playerScore} : ${player2Score}`
};
function resetGame(){
  playerScore = 0;
  player2Score = 0;
  paddle1={
    widht: 25,
    height :100,
    x: 0,
    y: 0
  }
  paddle2={
    widht: 25,
    height :100,
    x: gameWidth - 25,
    y: gameHeight - 100
  }
  ballSpeed = 1
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalId);
  gameStart();
};
