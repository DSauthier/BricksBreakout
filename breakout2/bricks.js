let keysBeingPressed = [];
let theGame;
let lives;
let playerLife = document.getElementById("playerBalls");
console.log(playerLife.innerHTML)


document.onkeydown = function (e) {
  let commands = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
  if (commands.includes(e.key)) {
    e.preventDefault();
  }
  if (!keysBeingPressed.includes(e.key)) {
    keysBeingPressed.push(e.key);
  }

}



document.onkeyup = function (e) {
  let theIndex = keysBeingPressed.indexOf(e.key)
  // console.log(theIndex)
  if (theIndex != -1) {
    keysBeingPressed.splice(theIndex, 1)
  }
}

document.getElementById("game-start").onclick  = function() {
   $(this).addClass('move');
  theGame = new Game();
  
  playerLife.innerHTML = lives
 
}

class Game{
  constructor(){
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ball1 = new Ball();
    this.Paddle = new Paddle();
    this.bricks = new Brick();
    this.score = 0;
    this.healthPoints = 10;
    
    this.arrayOfBricks = [];

    setInterval(()=>{
      this.drawEverything();
    


    },10)
    this.spawnObstacle();
    // this.score.youLose();
    // this.score.youWin();
    console.log(this.arrayOfBricks);
  }
  spawnObstacle() {
    let rowSpacing = 6;
    let columnSpacig = 20;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 8; c++) {
        // bricks[r][c] = { x: 0, y: 0, health: 1 };
        this.arrayOfBricks.push(new Brick(rowSpacing, columnSpacig, 1))
        columnSpacig += 30;
        if(r<2){
          this.bricks.ctx.fillStyle = "red"
        }
      }
      rowSpacing += 90;
      columnSpacig = 20;
 
    }
    
  }
  
  

  drawEverything() {
    let ctx = this.ctx
    let canvas = this.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ball1.drawBall();
    this.Paddle.drawPaddle();

    this.arrayOfBricks.forEach((block) => {
      
      block.drawBrick();
    })

  }
}
    
class Ball{
  constructor(){
    let ballRadius;
   
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ballRadius = ballRadius;
    // this.ballStartingPosX = ballStartingPosX;
    // this.ballStartingPosY = ballStartingPosY;


    // -==--==-=-=-=-=-=-
    this.ballRadius = 10;
    this.startingPositionX = this.canvas.width / 2;
    this.startingPositionY = this.canvas.height - 30;
    this.dx = 2; /*Math.round(Math.random()) * 4 - 1;/* will send the ball in a random x angle position */
    this.dy = -2;
    this.addX = this.startingPositionX;
    this.addY = this.startingPositionY;
    
  }

  drawBall() {
  
    let startingPositionX = this.startingPositionX;
    let startingPositionY = this.startingPositionY;
    let dx = this.dx;
    let dy = this.dy;
    let ctx = this.ctx
    let canvas = this.canvas
    
    ctx.beginPath();
    ctx.arc(this.startingPositionX, this.startingPositionY, this.ballRadius, 0, Math.PI * 2); /* the ballradius letiable will make it easier to guarantee the same radius everytime */
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    
    // console.log(this.regularBallCollision())
    // -------------

    // this.regularBallCollision();

    // the following lines of code make the ball move =-=- BALL MOVEMENT HERE -=-=-=-=-==-=--=
    
      if(this.canMove() === 0){
        // console.log("---=-==-=-=--=-=WHAT IS GOING ON!?-=-=-=-=-=")
        this.startingPositionY += this.dy;
        this.startingPositionX += this.dx;

      }
        
    
    if( this.canMove() === 1){
      // console.log("=-=--=-=-=-=-=CAN MOVE IS === 1 0-0-0-0-0-0-0-")
      this.dx = -this.dx;
    }
    if(this.canMove() === 2 ){
      this.dy = -this.dy;
      // this.startingPositionX -= this.dx;
      // this.startingPositionY -= this.dy;

    }
  // =--=-==-=-=-=-=-=-=-=-=-=-=-=-=-==-=--=-=-=-=-==-END OF BALL MOVEMENT -=-=-=-=-=-=-=-=-==-=-=-=-=-=--=-=


  }
  
  regularBallCollision() {
    let ballRadius = this.ballRadius;
    let startingPositionX = this.startingPositionX;
    let startingPositionY = this.startingPositionY;
    let dx = this.dx;
    let dy = this.dy;
    let canvas = this.canvas;

    // console.log(this.canMove(this.ballStartingPosX, this.ballStartingPosY));

    this.canMove(this.ballStartingPosX,this.ballStartingPosY)

  }
  canMove() {
    
    let result = 0;

   
    // console.log("foreach array is being acessed")
    //  -==-==-=-=-=-=-=-=-=-=-=- ball bounce off side walls =--=-=-=-==--==-=-
    if (this.startingPositionX + this.dx < 0 || this.startingPositionX + this.dx > this.canvas.width) {
        // console.log('scenario 1')
      result = 1;
    }
    // =--=-=-==--=-=-==-ball bounce off top wall -==--==-=-=-=-=-=-
    if (this.startingPositionY + this.dy < 0){
      // console.log("hello2")
      result = 2;
    }
    if (this.startingPositionY + this.dy > this.canvas.height - 5){
      result = 2;
      setTimeout(() => {
        score.healthPoints = score.healthPoints - 1 ;
        
      }, 2);
      console.log(lives)

    }
    // -==--=-=-==-=-=-=-=-=--=ball bounce of bottom wall and lose a life -==-=--==-=--=
    // if (this.startingPositionY + this.dy === this.canvas.height+0.1 ){
    //   console.log("lose a life")
    //   lives = lives -0.;
    //   console.log(lives)
    //   // console.log(lives)
    // }
    // =-=--=-=-=-=-==--==-ball bounce of paddle -===--=-==-=-=-=-=-=-
    if (this.startingPositionY + this.dy > 570 && this.startingPositionX + this.dx > theGame.Paddle.paddleX && this.startingPositionX + this.dx < theGame.Paddle.paddleX + theGame.Paddle.paddleWidth) {
      // console.log("-00-0--0-00--00--00--0-0-0-0-0--0-00--00-0--0", this.startingPositionY)
      // this.startingPositionY -= 10;
      // console.log("scenario 4");
      result = 2;
    } 
    

   
      theGame.arrayOfBricks.forEach((brick, i) => {

        // console.log(this.startingPositionX + this.ballRadius + this.dx, brick.x);
        
          // if(brick.health>0){

            if (this.startingPositionX + this.dx < brick.x + brick.brickWidth && this.startingPositionX + this.ballRadius + this.dx > brick.x && this.startingPositionY + this.dy < brick.y + brick.brickHeight && this.startingPositionY + this.ballRadius + this.dy > brick.y) {
              result = 2
              if (brick.health > 0) {
                brick.health--;
              }else{
                setTimeout(()=>{
                  if(theGame.lastBrickDeleted !== i){
 
                    theGame.arrayOfBricks.splice(i,1);
                    theGame.score += 100;
                    theGame.lastBrickDeleted = i;
                  }

                },20)


              }
            }

      // }

     
    })
    return result;
  }



    // if (this.startingPositionX + this.dx < 0 || this.startingPositionX + this.dx > this.canvas.width ) 
}

class Paddle {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    
    this.paddleHeight = 20;
    this.paddleWidth = 150;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2; /*starting position */
    this.rightPressed = false; /* is false bcause will only be true when clicked(called) */
    this.leftPressed = false;

    let paddleHeight = this.paddleHeight;
    let paddleWidth = this.paddleWidth;
    let paddleX = this.paddleX;
    let rightPressed = this.rightPressed;
    let leftPressed = this.leftPressed;
    let ctx = this.ctx;
    let canvas = this.canvas;
   
 
  }

  drawPaddle() {
    let paddleHeight = this.paddleHeight;
    let paddleWidth = this.paddleWidth;
    let paddleX = this.paddleX;
    let rightPressed = this.rightPressed;
    let leftPressed = this.leftPressed;
    let ctx = this.ctx;
    let canvas = this.canvas;

    // this.paddleMovement();
    this.movePaddle();
    

  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle =`rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`;
  ctx.fill();
  ctx.closePath();

}
  movePaddle() {
   

    if (keysBeingPressed.includes("ArrowLeft")) {
      if (this.canMove(this.x - 10)) {
        if(this.paddleX > 0){

          this.paddleX -= 10;
        }
      }
    }

    if (keysBeingPressed.includes("ArrowRight")) {
      if (this.canMove(this.x + 10 )) {
        if(this.paddleX + this.paddleWidth < 900){
        this.paddleX += 10;
        }
      }
    }
  }

  canMove(paddleX) {
    let result = true;

    if (paddleX < 0 || paddleX > this.canvas.width) {
      // Console.log("limit here")
      result = false;
    }

    return result;
  }

}
class Brick{
  constructor(x, y, health) {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.brickRowCount = 8;
    this.brickColumnCount = 10;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.x = x
    this.y = y;
    this.health = health


  }


  drawBrick() {
    if(this.health > 0){

      this.ctx.fillStyle = "green"
      if (this.y == 20) {

        this.ctx.fillStyle = "white";
      }
      if (this.y == 50) {
        this.ctx.fillStyle = "grey";
      }
      if (this.y == 80) {
        this.ctx.fillStyle = "purple";
      }
      if (this.y == 110) {
        this.ctx.fillStyle = "red";
      }
      if (this.y == 140) {
        this.ctx.fillStyle = "lightBlue";
      }
      if (this.y == 170) {
        this.ctx.fillStyle = "pink";
      }
      if (this.y == 200) {
        this.ctx.fillStyle = "yellow";
      }
      this.ctx.fillRect(this.x, this.y, this.brickWidth, this.brickHeight);
      
      
    }
  }



}
// class Score{
//   constructor(scorePoints,healthPoints){
//     this.scorePoints = 0;
//     this.healthPoints = 10;
    

//   }

//   youLose(){
//     if(this.healthPoints < 0){
//       alert("You Lose! Try Again!")
//       document.location.reload();
//     }
//   }
//   youWin(){
//     if(this.scorePoints > 8000){
//       alert("You WIN!!!")
//     }

//   }
// }

// class Bricks {
//   constructor() {
//     this.canvas = document.getElementById("myCanvas");
//     this.ctx = this.canvas.getContext("2d");
//     this.brickRowCount = 8;
//     this.brickColumnCount = 10;
//     this.brickWidth = 75;
//     this.brickHeight = 20;
//     this.brickPadding = 10;
//     this.brickOffsetTop = 30;
//     this.brickOffsetLeft = 30;
//     let brickRowCount =this.brickRowCount;
//     let brickColumnCount = this.brickColumnCount;
//     let brickWidth = this.brickWidth;
//     let brickHeight = this.brickHeight;
//     let brickPadding = this.brickPadding;
//     let brickOffsetTop = this.brickOffsetTop;
//     let brickOffsetLeft = this.brickOffsetLeft;
//     let ctx = this.ctx;
//     let canvas = this.canvas;

    
 
//   }

//   drawBricks() {
//     let ctx = this.ctx;
//     let canvas = this.canvas;

//     let brickRowCount = this.brickRowCount;
//     let brickColumnCount = this.brickColumnCount;
//     let brickWidth = this.brickWidth;
//     let brickHeight = this.brickHeight;
//     let brickPadding = this.brickPadding;
//     let brickOffsetTop = this.brickOffsetTop;
//     let brickOffsetLeft = this.brickOffsetLeft;

//     let bricks = [];
//     for (let c = 0; c < brickColumnCount; c++) {
//       bricks[c] = [];
//       for (let r = 0; r < brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0, status: 1 };
//       }
//     }

   

//   for (let c = 0; c < brickColumnCount; c++) {
//     for (let r = 0; r < brickRowCount; r++) {
//       if (bricks[c][r].status > 0) {

//         let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//         let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

//         if (r < 2) {

//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           ctx.fillStyle = "red";
//           ctx.fill();
//           ctx.closePath();
//         }
//         if (c <= 6 && c > 2 || r > 2) {

//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           ctx.fillStyle = "white";
//           ctx.fill();
//           ctx.closePath();

//         }

//         if (r >= 2 && r < 4) {

//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           ctx.fillStyle = "yellow";
//           ctx.fill();
//           ctx.closePath();
//         }
//         if (r >= 4) {
//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           ctx.fillStyle = "#07f207";
//           ctx.fill();
//           ctx.closePath();

//         }
//         if (r >= 6) {
//           // bricks[c][r].status = 2;
//           // console.log(bricks[c][r].status)
//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           bricks
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           ctx.fillStyle = "purple";
//           ctx.fill();
//           ctx.closePath();

//         }
//       }


//     }
//   }
// }
// // the following fucntion doesnt work yet
// collisionDetection() {

//   let ctx = this.ctx;
//   let canvas = this.canvas;

//   let brickRowCount = this.brickRowCount;
//   let brickColumnCount = this.brickColumnCount;
//   let brickWidth = this.brickWidth;
//   let brickHeight = this.brickHeight;
//   let brickPadding = this.brickPadding;
//   let brickOffsetTop = this.brickOffsetTop;
//   let brickOffsetLeft = this.brickOffsetLeft;

//   let bricks = [];
//   for (let c = 0; c < brickColumnCount; c++) {
//     bricks[c] = [];
//     for (let r = 0; r < brickRowCount; r++) {
//       bricks[c][r] = { x: 0, y: 0, status: 1 };
//     }
//   }

//   for (let c = 0; c < brickColumnCount; c++) {
//     for (let r = 0; r < brickRowCount; r++) {
//       let brick = bricks[c][r];

//       // regular bal -=-=-=-=-=-=-==--=-=-=
//       if (brick.status > 0) {
//         // HOW CAN I CALL ANOTHER CLASS INSIDE OF THIS ONE !? I NEED TO IDENTIFY STARTINGPOSITIONX OF BALL TO DEFINE THE COLLISION> 
//         // when it collides, with anything on the map, the ball posY will receive the opposite direction.
//         if (startingPositionX > brick.x && startingPositionX < brick.x + brickWidth && startingPositionY > brick.y && startingPositionY < brick.y + brickHeight) {
//           dy = -dy;
//           brick.status--;
//           score = score + 45;

//           if (score > 3599) {
//             setTimeout(() => {

//               alert("YOU WIN, CONGRATULATIONS!");

//             }, 1);
//             document.location.reload();

//             // console.log(scoreBricks.innerHTML)
//           }
//           scoreBricks.innerHTML = score;
//         }

//       }
// }
//   }
// }
// }




// if (startingPositionY + dy < ballRadius) { /* for top */
//   dy = -dy;
// }
// if (startingPositionY + dy > canvas.height - ballRadius) { /* if the y(vertical) position is bigger than the height of the canvas (bottom margin), y will be equal to the oposite value. the same goes for top margin */
  
//   if (startingPositionX > paddleX && startingPositionX < paddleX + paddleWidth) { /* paddle collision*/
//     console.log("paddle held")
//     dx = dx + 0.3;
//     dy = -dy - 0.3;
//   } else {
//     lives--;
    
//     playerLife.innerHTML = lives;
    
    
//     if (lives < 0) {
//       setTimeout(() => {
//         // alert("GAME OVER");
        
//       }, 1);
//       document.location.reload();
//     }
//     else {
//       startingPositionX = canvas.width / 2;
//       startingPositionY = canvas.height - 30;
//       dx = Math.random() * 3;
//       dy = Math.random() * -3;
//       paddleX = (canvas.width - paddleWidth) / 2;
//     }
//   }
// }



// ////////////////////////////PADDLE MOVEMENT TRYOUT /////////////////////


// paddleMovement() {
//   document.addEventListener("keydown", keyDownHandler, false);
//   document.addEventListener("keyup", keyUpHandler, false);
//   document.addEventListener("mousemove", mouseMoveHandler, false);

//   let paddleHeight = this.paddleHeight;
//   let paddleWidth = this.paddleWidth;
//   let paddleX = this.paddleX;
//   let rightPressed = this.rightPressed;
//   let leftPressed = this.leftPressed;
//   let ctx = this.ctx;
//   let canvas = this.canvas;


//  function keyDownHandler(e) {
//     if (e.keyCode == 39) {
//       rightPressed = true;
//       if (rightPressed && paddleX < canvas.width - paddleWidth) {
//         console.log("PADDLE SHOULD BE MOVING RIGHT")
//         paddleX += 7;
//     }
//   }
//     if (e.keyCode == 37) {
//       leftPressed = true;
//       if (leftPressed && paddleX > 0) {
//         console.log("PADDLE SHOULD BE MOVING LEFT")
//         paddleX -= 7;
//       }
//       }
//     }

//   function keyUpHandler(e) {
//     if (e.keyCode == 39) {
//       console.log("right pressed");
//       rightPressed = false;
//     }
//     if (e.keyCode == 37) {
//       console.log("left pressed");
//       leftPressed = false;
//     }
//   }
//   function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if (relativeX > 0 && relativeX < canvas.width) {
//       paddleX = relativeX - paddleWidth / 2;
//     }
//   }

//   // function ifStatements(){
//   // if (rightPressed && paddleX < canvas.width - paddleWidth) {
//   //   console.log("PADDLE SHOULD BE MOVING RIGHT")
//   //   paddleX += 7;
//   // } else if (leftPressed && paddleX > 0) {
//   //   console.log("PADDLE SHOULD BE MOVING LEFT")
//   //   paddleX -= 7;

//   // }




// }