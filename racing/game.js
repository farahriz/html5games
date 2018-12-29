let ballX = 75;
let ballY = 75;
let ballSpeedX = 4;
let ballSpeedY = -4;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COL_COUNT = 10;
const BRICK_ROW_COUNT = 14;
let brickGrid = new Array(BRICK_COL_COUNT*BRICK_ROW_COUNT)
let bricksLeft = 0;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
let paddleX = 400;

let canvas, canvasContext;

let mouseX = 0;
let mouseY = 0;

function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	paddleX = mouseX - PADDLE_WIDTH/2;

	//Tool to test ball in any position
		// ballX = mouseX;
		// ballY = mouseY;

};

function brickReset(){
	let i;
	for(i=0; i< 3*BRICK_COL_COUNT; i++){
		brickGrid[i]=false;
	}
	for(;i<BRICK_COL_COUNT*BRICK_ROW_COUNT; i++){
		brickGrid[i]=true;
		bricksLeft++;
		// console.log(bricksLeft)
	} 
};

window.onload = function() {
	// Setup canvas
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);

	brickReset()
	ballReset()
};

function updateAll() {
	moveAll();
	drawAll();	
};

function ballReset(){
	ballX = canvas.width/2;
	ballY = canvas.height/2;
};


function ballMove(){
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	//Determine ball interaction with canvas
		if (ballX < 0 && ballSpeedX < 0.0) { //left
			ballSpeedX *=-1;
		}
		if (ballX > canvas.width && ballSpeedX > 0.0) { //right
			ballSpeedX *=-1;
		}
		if (ballY < 0 && ballSpeedY < 0.0) { //top
			ballSpeedY *=-1;
		}
		if (ballY > canvas.height) { //bottom
			ballReset();
			ballReset();
			// ballSpeedY *=-1;
		}
};

function isBrickAtColRow(col,row){
	if(col >= 0  && col < BRICK_COL_COUNT && 
	   row >= 0 && row < BRICK_ROW_COUNT){
		let brickIndexUnderCoord = rowColToArrayIndex(col,row);
		return brickGrid[brickIndexUnderCoord];		
	} else {
		return false;
	}
};

function ballBrickHandling(){
	let ballBrickCol = Math.floor(ballX / BRICK_W);
	let ballBrickRow = Math.floor(ballY / BRICK_H);
	let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow)
	
	if(ballBrickCol >= 0  && ballBrickCol < BRICK_COL_COUNT && 
		ballBrickRow >= 0 && ballBrickRow < BRICK_ROW_COUNT){
			
		if(isBrickAtColRow(ballBrickCol,ballBrickRow)){
			brickGrid[brickIndexUnderBall] = false;
			bricksLeft--;
			// console.log(bricksLeft)

			let prevBallX= ballX-ballSpeedX;
			let prevBallY= ballY-ballSpeedY;
			let prevBrickCol = Math.floor(prevBallX/BRICK_W);
			let prevBrickRow = Math.floor(prevBallY/BRICK_H);

			let bothTestsFailed = true;

			if(prevBrickCol != ballBrickCol){
				if(isBrickAtColRow(prevBrickCol, prevBrickRow)==false){
					ballSpeedX *=-1
					bothTestsFailed = false;
				}				
			}

			if(prevBrickRow != ballBrickRow){
				if(isBrickAtColRow(prevBrickCol, prevBrickRow)==false){
					ballSpeedY *=-1
					bothTestsFailed = false;
				}
			}

			if(bothTestsFailed) { //armpit case, prevents ball from going right through
				ballSpeedX *=-1;
				ballSpeedY *=-1;
			}

		} // end of brick found
	} // end of valid col and row
};


function ballPaddleHandling(){
	let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
	let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;	
	let paddleLeftEdgeX = paddleX;
	let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;

	if( ballY > paddleTopEdgeY && // below the top of paddle
		ballY < paddleBottomEdgeY && // above bottom of paddle
		ballX > paddleLeftEdgeX && // right of the left side of paddle
		ballX < paddleRightEdgeX) { // left of the left side of paddle
		
		ballSpeedY *= -1;

		var centerOfPaddleX = paddleX+PADDLE_WIDTH/2;
		var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.35;

		if(bricksLeft==0){
			brickReset();
		} // out of bricks
	} // ball center inside paddle
};

function moveAll(){
	ballMove();
	ballBrickHandling();
	ballPaddleHandling();
};

function rowColToArrayIndex(col,row){
	return col + BRICK_COL_COUNT * row;
};


function drawBricks(){
	for(let eachRow = 0; eachRow<BRICK_ROW_COUNT; eachRow++){
		for (let eachCol=0; eachCol<BRICK_COL_COUNT; eachCol++){

			let arrayIndex = BRICK_COL_COUNT*eachRow + eachCol;

			if(brickGrid[arrayIndex]){
				colorRect(BRICK_W*eachCol,BRICK_H*eachRow, BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP, 'yellow');
			} // end of is this brick
		} //end of for loop

	}		

};


function drawAll(){
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white') // draw paddle
	colorCircle(ballX, ballY, 10, 'white'); // draw ball

	drawBricks();


};

//Basic draw functions
	function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor){
		canvasContext.fillStyle = fillColor;
		canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
	}

	function colorCircle(centerX,centerY, radius, fillColor){
		canvasContext.fillStyle = fillColor;
		canvasContext.beginPath();
		canvasContext.arc(centerX,centerY,radius,0, Math.PI*2, true);
		canvasContext.fill();
	}	

	function colorText(showWords, textX,textY, fillColor){
		canvasContext.fillStyle = fillColor;
		canvasContext.fillText(showWords, textX,textY);
	}