console.log("connected")

let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canvas, canvasContext;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
let paddleX = 400;


function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	let mouseX = evt.clientX - rect.left - root.scrollLeft;
	// var mouseY = evt.clientY - rect.top - root.scrollTop;
	paddleX = mouseX - PADDLE_WIDTH/2;

}

window.onload = function() {
	// Setup canvas
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);
};

function updateAll() {
	moveAll();
	drawAll();	
};

function ballReset(){
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}


function moveAll(){
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX > canvas.width) { //right
		ballSpeedX *=-1;
	}
	if (ballX < 0) { //left
		ballSpeedX *=-1;
	}

	if (ballY > canvas.height) { //bottom
		ballReset();
		// ballSpeedY *=-1;
	}
	if (ballY < 0) { //top
		ballSpeedY *=-1;
	}

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
	}
};

function drawAll(){
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
	colorCircle(ballX, ballY, 10, 'white'); // draw ball
	colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white') // draw paddle

};

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