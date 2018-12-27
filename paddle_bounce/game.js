console.log("connected")

let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 5;
let canvas, canvasContext;


window.onload = function() {
	// Setup canvas
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

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
	// Draw canvas background
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);

	// Draw ball
	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(ballX,ballY,10,0, Math.PI*2, true);
	canvasContext.fill();

};