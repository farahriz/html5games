let carPic = document.createElement('img');
let carPicLoaded = false;

let carX = 75;
let carY = 75;
let carAng = 0;
let carSpeed = 2;


const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COL_COUNT = 20;
const TRACK_ROW_COUNT = 15;
let trackGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];



let canvas, canvasContext;

const KEY_LEFT_ARROW 	= 37;
const KEY_UP_ARROW 		= 38;
const KEY_RIGHT_ARROW 	= 39;
const KEY_DOWN_ARROW 	= 40;

let mouseX = 0;
let mouseY = 0;

function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;


	//Tool to test car in any position
		// carX = mouseX;
		// carY = mouseY;

};

function keyPressed(evt){
	// console.log("Key pressed: "+evt.keyCode);
	if(evt.keyCode == KEY_LEFT_ARROW){
		carAng -=0.5;
	}
	if(evt.keyCode == KEY_RIGHT_ARROW){
		carAng +=0.5;
	}
	if(evt.keyCode == KEY_DOWN_ARROW){
		carSpeed -=0.5;
	}
	if(evt.keyCode == KEY_UP_ARROW){
		carSpeed +=0.5;
	}


}

function keyReleased(evt){
	console.log("Key released: "+evt.keyCode);
}

window.onload = function() {
	// Setup canvas
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

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


function carReset(){;
	for(let eachRow=0;eachRow<TRACK_ROW_COUNT;eachRow++) {
		for(let eachCol=0;eachCol<TRACK_COL_COUNT;eachCol++) {
			let arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(trackGrid[arrayIndex] == 2) {
				trackGrid[arrayIndex] = 0;
				carX = eachCol * TRACK_W + TRACK_W/2;
				carY = eachRow * TRACK_H + TRACK_H/2;
			}
		}
	}
};


function carMove(){
	carX += Math.cos(carAng) * carSpeed;
	carY += Math.sin(carAng) * carSpeed;


};

function isTrackAtColRow(col,row){
	if(col >= 0  && col < TRACK_COL_COUNT && 
	   row >= 0 && row < TRACK_ROW_COUNT){
		let trackIndexUnderCoord = rowColToArrayIndex(col,row);
		return (trackGrid[trackIndexUnderCoord] == 1);		
	} else {
		return false;
	}
};

function carTrackHandling(){
	let carTrackCol = Math.floor(carX / TRACK_W);
	let carTrackRow = Math.floor(carY / TRACK_H);
	let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow)
	
	if(carTrackCol >= 0  && carTrackCol < TRACK_COL_COUNT && 
		carTrackRow >= 0 && carTrackRow < TRACK_ROW_COUNT){
			
		if(isTrackAtColRow(carTrackCol,carTrackRow)){
			carSpeed *=-1
		} // end of track found
	} // end of valid col and row
};

function moveAll(){
	carMove();
	carTrackHandling();
};

function rowColToArrayIndex(col,row){
	return col + TRACK_COL_COUNT * row;
};


function drawTracks(){
	for(let eachRow = 0; eachRow<TRACK_ROW_COUNT; eachRow++){
		for (let eachCol=0; eachCol<TRACK_COL_COUNT; eachCol++){

			let arrayIndex = TRACK_COL_COUNT*eachRow + eachCol;

			if(trackGrid[arrayIndex]){
				colorRect(TRACK_W*eachCol,TRACK_H*eachRow, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'yellow');
			} // end of is this track
		} //end of for loop

	}		

};


function drawAll(){
	colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
	// colorCircle(carX, carY, 10, 'white'); // draw car

	if(carPicLoaded){
		drawBitmapWithRotation(carPic, carX,carY, carAng);
	}

	drawTracks();
};

function drawBitmapWithRotation(useBitmap, atX, atY, withAng){
	canvasContext.save();
	canvasContext.translate(atX,atY);
	canvasContext.rotate(carAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
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