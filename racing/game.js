let canvas, canvasContext;

window.onload = function() {
	// Setup canvas
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();

	carPic.onload = function(){
		carPicLoaded = true;
	}
	carPic.src = "player1car.png";

	carReset()
};

function updateAll() {
	moveAll();
	drawAll();	
};


function moveAll(){
	carMove();
	carTrackHandling();
};


function clearScreen(){
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
}

function drawAll(){
	clearScreen();
	carDraw();
	drawTracks();
};

