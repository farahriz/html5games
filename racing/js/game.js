let canvas, canvasContext;

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width, canvas.height, 'red')
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

	loadImages();

};

function imageLoadingDoneSoStartGame(){
	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();
	carReset();
}

function updateAll() {
	moveAll();
	drawAll();	
};


function moveAll(){
	carMove();
	carTrackHandling();
};

function drawAll(){
	drawTracks();
	carDraw();
};

