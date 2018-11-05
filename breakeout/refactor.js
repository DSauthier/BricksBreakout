canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");

// -=-=-=-=-=-==-=-variable -=-=----=-
let scoreBricks = document.getElementById("bricksDestroyed");
let playerLife = document.getElementById("playerBalls")
let score = 0;
let lives = 3;

let theGame;

// -=-==-=-for the draw function -=-=-
let startingPositionX = canvas.width / 2;
let startinPositionY = canvas.height - 30;
let dx = Math.round(Math.random()) * 4 - 2;/* will send the ball in a random x angle position */
let dy = -2;

// -=-=-=-=-=- for the collision detection -=-=-=-=
let ballRadius = 10;

// -=-=-=-=-= for the paddle -=-=-=-
let paddleHeight = 20;
let paddleWidth = 150;
let paddleX = (canvas.width - paddleWidth) / 2; /*starting position */
let rightPressed = false; /* is false bcause will only be true when clicked(called) */
let leftPressed = false;

// -=-=-=--=-=- bricks build -=-=-==-
let brickRowCount = 8;
let brickColumnCount = 10;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
// defining blue bricks grid =-=-=-=-=-=-=-=-=-=
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// defining green bricks grid -=-=-=-=-=--
// let bricks = [];
// for (let c = 0; c < brickColumnCount; c++) {
//   bricks[c] = [];
//   for (let r = 0; r < brickRowCount; r++) {
//     bricks[c][r] = { x: 0, y: 0, status: 2 };
//   }
// }

// -=-=-=-=-=-=-=-=-draw function-=-=-=-
// the draw function will begin erasing anything that was draw, than we will beginPath of drawing, will will draw the circle, fill it and the path ends
// at the end of the path, we will add +2 to position X and -2 to position Y, at every frame, making it move;
// after that, we will restart the function, creating a loop, clearing and drawing at everyframe and therefore creating the notion of movement.
// we can divide this operation into two. one drawing the actual ball, and the other drawing everything we need and creating the movement.
//  inside of the draw() function we can call the drawBall function, or any other drawing function we want.
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status > 0) {
        
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        
        if(r < 2){
          
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "blue";
          ctx.fill();
          ctx.closePath();
        }
          if (c <= 6 && c>2 || r > 2) {
      
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
           
          }
        
        if (r>=2 && r < 4) {

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "orange";
          ctx.fill();
          ctx.closePath();
        }
        if(r >= 4){
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "green";
          ctx.fill();
          ctx.closePath();
        
        }
        if (r >= 6) {
          
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "purple";
          ctx.fill();
          ctx.closePath();
       
        }
      }
      
    
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(startingPositionX, startinPositionY, ballRadius, 0, Math.PI * 2); /* the ballradius letiable will make it easier to guarantee the same radius everytime */
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();

  
  // -=-=-==-=--=collision detection for borders  -=-=-=-=-=--=
  if (startinPositionY + dy < ballRadius) { /* for top */
    dy = -dy;
  }
  if (startinPositionY + dy > canvas.height - ballRadius) { /* if the y(vertical) position is bigger than the height of the canvas (bottom margin), y will be equal to the oposite value. the same goes for top margin */
    
    if (startingPositionX > paddleX && startingPositionX < paddleX + paddleWidth) { /* paddle collision*/
      console.log("paddle held")
      dx = dx + 0.3;
      dy = -dy - 0.3;
    } else {
      lives--;

      playerLife.innerHTML = lives;

      
      if (lives < 0) {
        setTimeout(() => {
          alert("GAME OVER");
          
        }, 1);
        document.location.reload();
        
      }
      else {
          startingPositionX = canvas.width / 2;
          startinPositionY = canvas.height - 30;
          dx = Math.random()* 3;
          dy = Math.random() * -3;
          paddleX = (canvas.width - paddleWidth) / 2;
      }
       
      /* the ball keeps going , how to make it stop or disappear? */
      // drawBall();
      

      // document.location.reload(); /* everytime u lose a life the page */
    }
  }
  if (startingPositionX + dx > canvas.width - ballRadius || startingPositionX + dx < 0) { /* same logic for left and right, just using the X position(horizontal). The - BallRadius will let the ball bounce but without entering in its image(radius)  */
    dx = -dx;
  }
  // -=-=-=-=-=-=-=- paddle movement drawing -=-=-=-=-=-=-
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  startingPositionX += dx;
  startinPositionY += dy;
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
  if (e.keyCode == 37) {
    console.log("left pressed")
    leftPressed = true;
  }

}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  if (e.keyCode == 37) {
    leftPressed = false;
  }
  if (e.keyCode == 32) {
    console.log("space pressed");
    dx = dx - Math.floor(Math.random() * 5) / 2;
    dy = dy - Math.floor(Math.random()* 5) / 2;

  }
}


function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let brick = bricks[c][r];
      
      if (brick.status >0 ) {
        // when it collides, with anything on the map, the ball posY will receive the opposite direction.
        if (startingPositionX > brick.x && startingPositionX < brick.x + brickWidth && startinPositionY > brick.y && startinPositionY < brick.y + brickHeight) {
          dy = -dy;
          brick.status --;
          score = score+ 35
          // console.log(score);
          scoreBricks.innerHTML = score;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          
          // console.log(scoreBricks.innerHTML)
        }
      }
      }
      if(brick.status == 2){
        if (startingPositionX > brick.x && startingPositionX < brick.x + brickWidth && startinPositionY > brick.y && startinPositionY < brick.y + brickHeight) {
          dy = -dy;
          brick.status--;
          score++
          // console.log(score);
          scoreBricks.innerHTML = score;
          // console.log(scoreBricks.innerHTML)

        }

      }
    }
  }
}


setInterval(draw, 10);




