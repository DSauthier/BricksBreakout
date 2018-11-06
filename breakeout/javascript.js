canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

// -=-=-=-=-=-==-=-variables -=-=----=-

let theGame;

// -=-==-=-for the draw function -=-=-
let x = canvas.width / 2;
let y = canvas.height - 30;
var dx = 2;
var dy = -2;

// -=-=-=-=-=- for the collision detection -=-=-=-=
let ballRadius = 10;

// -=-=-=-=-= for the paddle -=-=-=-
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false; /* is false bcause will only be true when clicked(called) */
let leftPressed = false;

// -=-=-=--=-=- blue bricks build -=-=-==-
let brickRowCount = 5;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// -=-=-=-==-- green bricks build -=-=-=-=-
let greenBrickRowCount = 1;
let greenBrickColumnCount = 5;
let greenBrickWidth = 75;
let greenBrickHeight = 20;
let greenBrickPadding = 10;
let greenBrickOffsetTop = brickOffsetTop + 180;
let greenBrickOffsetLeft = brickOffsetLeft;


// -=-=-=-=-= loop for blue bricks -=-=-=
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// =-==-=-=-=-- loop for green bricks -=-=-==-=-

let greenBricks = [];
for (let i = 0; i < greenBrickColumnCount; i++) {
  greenBricks[i] = [];
  for (let j = 0; j < greenBrickRowCount; j++) {
    greenBricks[i][j] = { x: 0, y: 0, status: 2 };
  }
}

// -=-=-=-=-=-=-=-=-draw function-=-=-=-
// the draw function will begin erasing anything that was draw, than we will beginPath of drawing, will will draw the circle, fill it and the path ends
// at the end of the path, we will add +2 to position X and -2 to position Y, at every frame, making it move;
 // after that, we will restart the function, creating a loop, clearing and drawing at everyframe and therefore creating the notion of movement.
// we can divide this operation into two. one drawing the actual ball, and the other drawing everything we need and creating the movement.
//  inside of the draw() function we can call the drawBall function, or any other drawing function we want.
function drawBricksBlue() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status >= 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBricksGreen() {
  for (let i = 0; i < greenBrickColumnCount; i++) {
    for (let j = 0; j < greenBrickRowCount; j++) {
      if (greenBricks[i][j].status >= 1) {
        let greenBrickX = i * (greenBrickWidth + greenBrickPadding) + greenBrickOffsetLeft;
        let greenBrickY = j * (greenBrickHeight + greenBrickPadding) + greenBrickOffsetTop;
        greenBricks[i][j].x = greenBrickX;
        greenBricks[i][j].y = greenBrickY;
        ctx.beginPath();
        ctx.rect(greenBrickX, greenBrickY, greenBrickWidth, greenBrickHeight);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}


function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); /* the ballradius variable will make it easier to guarantee the same radius everytime */
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricksBlue();
  drawBricksGreen();
  collisionDetection();
  // -=-=-==-=--=collision detection -=-=-=-=-=--=
  if(y+dy < ballRadius){ /* for top */
    dy = -dy;
  }
   else if (y + dy > canvas.height - ballRadius) { /* if the y(vertical) position is bigger than the height of the canvas (bottom margin), y will be equal to the oposite value. the same goes for top margin */
    if (x > paddleX && x < paddleX + paddleWidth) { /* if the horizonatl */
      console.log("paddle held")
      dy = -dy;
    } else{
     alert("you lost a life");
      document.location.reload(); /* everytime u lose a life the page */
    }
  }
  if (x + dx > canvas.width - ballRadius || x + dx < 0) { /* same logic for left and right, just using the X position(horizontal). The - BallRadius will let the ball bounce but without entering in its image(radius)  */
    dx = -dx;
  }

  function paddleMovement (){

    // -=-=-=-=-=-=-=- paddle movement drawing -=-=-=-=-=-=-
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  }

  x += dx;
  y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// -=-=-=-checking if the keys are being pressed-=-=-=-
// the key down handler will make the boolean variable turn true, while the uphandler will turn them back off.

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    console.log("right pressed")
    rightPressed = true;
  }
  else if (e.keyCode == 37) {
    console.log("left pressed")
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function collisionDetection() {
  // -=-=-=-=-blue bricks-=-=-=-=
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status--;
        }
      }
      if(b.status == 0){
        dy= - dy
      }
    }
  }
// -=-=-=-=-=-= green bricks-=-=-=-==--==-
  for (let i = 0; i < greenBrickColumnCount; i++) {
    for (let j = 0; j < greenBrickRowCount; j++) {
      let gb = greenBricks[i][j];
      if (gb.status > 1) {
        if (x > gb.x && x < gb.x + greenBrickWidth && y > gb.y && y < gb.y + greenBrickHeight) {
          dy = -dy;
          gb.status--;
        }
      }
      if (gb.status == 0) {
        dy = - dy
      }
    }
  }


}


setInterval(draw, 10);






// class Game {
//   constructor(){
//     this.canvas = document.getElementById("myCanvas");
//     this.ctx = this.canvas.getContext("2d");
//   }
  
//   draw(){
//     this.ctx.beginPath();
//     this.ctx.arc(50, 50, 10, 0, Math.PI * 2);
//     this.ctx.fillStyle = "#0095DD";
//     this.ctx.fill();
//     this.ctx.closePath();
//   }

//   setInterval(draw, 10)
// }

// class Canvas{
  
// }