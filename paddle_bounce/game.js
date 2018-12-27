console.log("connected")

let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canvas, canvasContext;

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_THICKNESS = 10;
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

function moveAll(){
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX > canvas.width) {
		ballSpeedX *=-1;
	}
	if (ballX < 0) {
		ballSpeedX *=-1;
	}

	if (ballY > canvas.height) {
		ballSpeedY *=-1;
	}
	if (ballY < 0) {
		ballSpeedY *=-1;
	}

};

function drawAll(){
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
	colorCircle(ballX, ballY, 10, 'white'); // draw ball
	colorRect(paddleX, canvas.height-PADDLE_THICKNESS, PADDLE_WIDTH, PADDLE_THICKNESS, 'white')

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