let canvas, canvasContext;

let blueWarrior = new warriorClass();

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
	loadLevel(oldLevel);
}


function loadLevel(whichLevel){
	trackGrid = whichLevel.slice();
	blueWarrior.reset(carPic, "Blue Storm");
}

function updateAll() {
	moveAll();
	drawAll();	
};


function moveAll(){
	blueWarrior.move();

};

function drawAll(){
	drawTracks();
	blueWarrior.draw();

};

