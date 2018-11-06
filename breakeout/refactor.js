canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");


// -=-=-=-=-=-==-=-variables begin -=-=----=-
let scoreBricks = document.getElementById("bricksDestroyed");
let playerLife = document.getElementById("playerBalls")
let score = 0;
let lives = 10;

let theGame;

// -=-==-=-for the regular drawBall function -=-=-
let startingPositionX = canvas.width / 2;
let startingPositionY = canvas.height - 30;
let dx = Math.round(Math.random()) * 4 - 1;/* will send the ball in a random x angle position */
let dy = -2;

// -=-=-=-=-=-=-=- for the special ball function -=-=-=-=-=-
let newBallPosX = canvas.width / 2;
let newBallPosY = canvas.height - 30;
let rx = (Math.random()) * 3 - 0.35;/* will send the ball in a random x angle position */
let ry = -(Math.random()) * 3 - 0.35 ;

// -=-=-=-=-=- for the collision detection -=-=-=-=
let ballRadius = 10;
let redBallRadius = 10;
// -=-=-=-=-= for the paddle -=-=-=-
let paddleHeight = 20;
let paddleWidth = 150;
let paddleX = (canvas.width - paddleWidth) / 2; /*starting position */
let rightPressed = false; /* is false bcause will only be true when clicked(called) */
let leftPressed = false;
let spacePressed = false;
let tPressed = false;
let rPressed = false;
let shiftPressed = false;
let test = false;

// -=-=-=--=-=- bricks build -=-=-==-
let brickRowCount = 8;
let brickColumnCount = 10;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// =--=-=-=-=--==--=animation sprites=--==--=-=-=
let spriteArray = ["./sprites/explosion/explo1.png", "./sprites/explosion/explo2.png", "./sprites/explosion/explo3.png", "./sprites/explosion/explo4.png",
  "./sprites/explosion/explo5.png", "./sprites/explosion/explo6.png", "./sprites/explosion/explo7.png", "./sprites/explosion/explo8.png"
  , "./sprites/explosion/explo9.png", "./sprites/explosion/explo10.png", "./sprites/explosion/explo11.png"]

//  function spriteDraw(){

//    for(let i = 0 ; i< spriteArray.length ; i++){
//      ctx.drawImage(spriteArray[i],100,100)
//     }
//   } 

// let sprite = new Image();
// sprite.src = "./sprites/Explosion.png";
// let spriteContextX = 0;
// let spriteContextY = 0;
// let spriteX = 35;
// let spriteY = 0;
// let spriteWidth = 35;
// let spriteHeight = 34
// function drawSprite(){
//   ctx.drawImage(sprite,0,0)
// }
class animation {
  constructor() {
    this.x = 400;
    this.y = 450;
    this.width = 100;
    this.height = 100;
    this.imgsrc = spriteArray
    this.ctx = document.getElementById('game-board').getContext('2d');

  }

  drawExplosion() {
    let theImage = new Image();
    let i = 0;

  let x = setInterval(()=>{

    theImage.src = spriteArray[i];
    theImage.onload = () => {
      this.ctx.drawImage(theImage, this.x, this.y, this.width, this.height);
    }
      i++;
      if(i > 11){
        clearInterval(x);
        // clearInterval will stop the interval.
        // every set interval is assigned a random number, and we hold into that number we set it into a variable.

      }
    },200)
  }
}
// drawSprite(sprite, spriteX, spriteY, spriteWidth, spriteHeight, spriteContextX, spriteContextY)

// -=-=-==-=-=-=-=--=for shooting bullets -==-=-=--

let bulletHeight = 5;
let bulletWidth = 2;
let bulletX = paddleX; /*starting position */
let bulletY = canvas.height - 10; /*starting position */
let bX = 0;
let bY = -2



// -==-=-=-=--==-=-=-=-=- END OF VARIABLES -==-=-=--=-=-=-=-=-=-=

// -==--==--=-=-=defining bricks grid =-=-=-=-=-=-=-=-=-=
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
// -=-==-=-=--=-==- end of brick grid =--=-=-=-==--==-


function shooting(){
    bulletX += bX;
    bulletY += bY;
  }

// -=-=-==--==--=regular ball =-=-=-=-=--=-=
function regularBallCollision() {

  if (startingPositionY + dy < ballRadius) { /* for top */
    dy = -dy;
  }
  if (startingPositionY + dy > canvas.height - ballRadius) { /* if the y(vertical) position is bigger than the height of the canvas (bottom margin), y will be equal to the oposite value. the same goes for top margin */

    if (startingPositionX > paddleX && startingPositionX < paddleX + paddleWidth) { /* paddle collision*/
      console.log("paddle held")
      dx = dx + 0.3;
      dy = -dy - 0.3;
    } else {
      lives--;

      playerLife.innerHTML = lives;


      if (lives < 0) {
        setTimeout(() => {
          // alert("GAME OVER");

        }, 1);
        document.location.reload();

      }
      else {
        startingPositionX = canvas.width / 2;
        startingPositionY = canvas.height - 30;
        dx = Math.random() * 3;
        dy = Math.random() * -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  if (startingPositionX + dx > canvas.width - ballRadius || startingPositionX + dx < 0) { /* same logic for left and right, just using the X position(horizontal). The - BallRadius will let the ball bounce but without entering in its image(radius)  */
    dx = -dx;
  }
  

  startingPositionX += dx;
  startingPositionY += dy;
}
 // -==--=-=-=-=-=regular ball ends =--=-==-=-=--=-=-=-=-=

// -=-=-==--==--=new ball =-=-=-=-=--=-=
function createNewBallCollision(){
    if (newBallPosY + ry < redBallRadius) {
      /* for top */
      ry = -ry;
    }
    if (newBallPosY + ry > canvas.height - redBallRadius) {
      /* if the y(vertical) position is bigger than the height of the canvas (bottom margin), y will be equal to the oposite value. the same goes for top margin */

      if (newBallPosX > paddleX && newBallPosX < paddleX + paddleWidth) {
        /* paddle collision*/
        console.log("paddle held");
        rx = rx + 0.5;
        ry = -ry - 0.5;
      } else {
        lives--;

        playerLife.innerHTML = lives;

        if (lives < 0) {
          setTimeout(
            () => {
              alert(
                "GAME OVER"
              );
            },
            1
          );
          document.location.reload();
        } else {
          newBallPosX = canvas.width / 2;
          newBallPosY = canvas.height - 30;
          rx = Math.random() * 3;
          ry = Math.random() * -3;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }
    if (newBallPosX + rx > canvas.width - redBallRadius || newBallPosX + rx < 0) {
      /* same logic for left and right, just using the X position(horizontal). The - BallRadius will let the ball bounce but without entering in its image(radius)  */
      rx = -rx;
    }
    // adding movement  to the balls;
    newBallPosX += rx;
    newBallPosY += ry;
  }
    // -==--=-=-=-=-=new ball ends =--=-==-=-=--=-=-=-=-=

 
   // -=-=-=-=-=-=-=- paddle movement drawing -=-=-=-=-=-=-
function paddleMovement() {

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  if (shiftPressed) {
    console.log("wowowoowowowowow")

  }
}

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

        if (r < 2) {

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.closePath();
        }
        if (c <= 6 && c > 2 || r > 2) {

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.closePath();

        }

        if (r >= 2 && r < 4) {

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "yellow";
          ctx.fill();
          ctx.closePath();
        }
        if (r >= 4) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#07f207";
          ctx.fill();
          ctx.closePath();

        }
        if (r >= 6) {
          // bricks[c][r].status = 2;
          // console.log(bricks[c][r].status)
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          bricks
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
// -=-=-=-=-=-=--=-=draw special ball -=-=-=-=-=-=-
function drawBall1() {

  createNewBallCollision()
  // if (shiftPressed === true) {
  // }

  ctx.beginPath();
  ctx.arc(newBallPosX, newBallPosY, redBallRadius,0, Math.PI * 2); /* the ballradius letiable will make it easier to guarantee the same radius everytime */
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// -=-=-=-==-=-=--=-==- regular ball -=--=-=-=-==-
function drawBall() {
  regularBallCollision()
  ctx.beginPath();
  ctx.arc(startingPositionX, startingPositionY, ballRadius, 0, Math.PI * 2); /* the ballradius letiable will make it easier to guarantee the same radius everytime */
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
// -==-=-=-=--==-for the paddle -==-=-=--==--=
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`;
  ctx.fill();
  ctx.closePath();
}
// -=-==-=--==-=- for the shooting action =-=-=--=-=-=
// function shoot() {
//   bulletX = paddleX;
//   shooting();
//   // shootingCollision();
//   ctx.beginPath();
//   ctx.rect(bulletX, bulletY, bulletWidth, bulletHeight);
//   ctx.fillStyle = "red";
//   ctx.fill();
//   ctx.closePath();
// }


// =--=-==--=-==--==-=-KEY HANDLERS BEGIN --=--=-==--=-=-=-=-=-=

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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
if(e.keyCode = 32){
  spacePressed = true;
}
  // if (e.keyCode == 16) {
  //   test = true;
  if(e.keyCode == 84){
    tPressed = true;
  }

  if (e.keyCode == 82) {
    rPressed = true;
  }
    

  // }

}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }
  if (e.keyCode == 37) {
    leftPressed = false;
  }
  if (e.keyCode == 32) {
    dx = dx - Math.floor(Math.random() * 10) / 2;
    dy = dy - Math.floor(Math.random()* 10) / 2;
    rx = rx - Math.floor(Math.random() * 10) / 2;
    ry = ry - Math.floor(Math.random() * 10) / 2;
    spacePressed = false;
  }
  if (e.keyCode == 16) {
    test = true;
  }
  if (e.keyCode == 84) {
    tPressed = false
    dx = dx * 3;
    dy = dy * 3;
    rx = rx * 3;
    ry = ry * 3;
  }
  if (e.keyCode == 82) {
    rPressed = false;
    ballRadius = Math.random()*20 + 5
    redBallRadius = Math.random()*19 + 5;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}


// -==-=--==-=-=-=--= END OF KEY HANDLERS =--==--=-==--==-=-=--=

// -==-=--=-=-=-==-COLLISION DETECTION =--==--=-==-=-=-=-

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let brick = bricks[c][r];

      // regular bal -=-=-=-=-=-=-==--=-=-=
      if (brick.status > 0) {
        // when it collides, with anything on the map, the ball posY will receive the opposite direction.
        if (startingPositionX > brick.x && startingPositionX < brick.x + brickWidth && startingPositionY > brick.y && startingPositionY < brick.y + brickHeight) {
          dy = -dy;
          brick.status--;
          score = score + 45;

          if (score > 3599) {
            setTimeout(() => {
              
              alert("YOU WIN, CONGRATULATIONS!");

            }, 1);
            document.location.reload();

            // console.log(scoreBricks.innerHTML)
          }
          scoreBricks.innerHTML = score;
        }

        // -=-=-=-=-=-=-=-=--=-===--=-=second ball collision to bricks =-=-==-=-=-=--=

        if (newBallPosX > brick.x && newBallPosX < brick.x + brickWidth && newBallPosY > brick.y && newBallPosY < brick.y + brickHeight) {
          ry = -ry;
          brick.status--;
          score = score + 45;

          if (score > 3599) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();

            
          }
          scoreBricks.innerHTML = score;
        }
      }
// // -=-==--==--=-==-=-=-=-=--=ball to ball collision -==--=-=-==--=-=
//       if (newBallPosX > startingPositionX && newBallPosX < startingPositionX + ballRadius && newBallPosY > startingPositionY && newBallPosY < startingPositionY + ballRadius) {
//         console.log("collision")
        
//         ry = -ry;
//         rx = -rx;
//         dy = -dy;
//         dx = -dx;
//       }
    
    
    // -=-=-=-=-=-==-=-=-=- collision for bullets -=-=-=-=-=-=-=
     // let bulletHeight = 10;
  // let bulletWidth = 5;
  // let bulletX = paddleX; /*starting position */
  // let bulletY = canvas.height - 10; /*starting position */
  // let bX = 0;
  // let bY = -2

    if (bulletX > brick.x && bulletX < brick.x + brickWidth && bulletY > brick.y && bulletY < brick.y + brickHeight) {
      bY = 0;
      brick.status--;
      score = score + 45;
      scoreBricks.innerHTML = score;
      test == false;
    }
  }
  }
}

// ==--=-==-=-=--==--= END OF COLLISION ENGINE ==-=-=-=-=-=-=--=

//=-=-=-=-=--==-=-=-=-=--==- ENGINE WHERE EVERYTHING IS CALLED -=--=--==-=-=-=-=-=-=-=-=-

function draw() {
  

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // spriteDraw();
  paddleMovement();
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  // drawSprite(sprite,spriteX,spriteY,spriteWidth,spriteHeight,spriteContextX,spriteContextY);
if (test == true){
  // console.log("shift key was pressed =-=--=-=-=shooting-=--=-=-=")
  // shoot()
  drawBall1();
  createNewBallCollision();
}

}
// =-=--=-=-=-=-==-=-=-END OF ENGINE ==-=-=--=-==-=-=-=-=-=-

// =--=-=-=-=-=-=-=-= FPS INTERVAL -=-=-==-=--==--=
setInterval(draw, 10);




