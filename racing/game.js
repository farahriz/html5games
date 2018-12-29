let carPic = document.createElement('img');
let carPicLoaded = false;

let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;

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

let mouseX = 0;
let mouseY = 0;

function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;


	//Tool to test ball in any position
		// ballX = mouseX;
		// ballY = mouseY;
		//ballSpeedX = 5;
		//ballSpeedY = 5;

};

window.onload = function() {
	// Setup canvas
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Setup frame refresh
	let framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', updateMousePos);

	carPic.onload = function(){
		carPicLoaded = true;
	}
	carPic.src = "player1car.png";

	ballReset()
};

function updateAll() {
	moveAll();
	drawAll();	
};


function ballReset() {
	for(let eachRow=0;eachRow<TRACK_ROW_COUNT;eachRow++) {
		for(let eachCol=0;eachCol<TRACK_COL_COUNT;eachCol++) {
			let arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(trackGrid[arrayIndex] == 2) {
				trackGrid[arrayIndex] = 0;
				ballX = eachCol * TRACK_W + TRACK_W/2;
				ballY = eachRow * TRACK_H + TRACK_H/2;
			}
		}
	}
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

function isTrackAtColRow(col,row){
	if(col >= 0  && col < TRACK_COL_COUNT && 
	   row >= 0 && row < TRACK_ROW_COUNT){
		let trackIndexUnderCoord = rowColToArrayIndex(col,row);
		return (trackGrid[trackIndexUnderCoord] == 1);		
	} else {
		return false;
	}
};

function ballTrackHandling(){
	let ballTrackCol = Math.floor(ballX / TRACK_W);
	let ballTrackRow = Math.floor(ballY / TRACK_H);
	let trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow)
	
	if(ballTrackCol >= 0  && ballTrackCol < TRACK_COL_COUNT && 
		ballTrackRow >= 0 && ballTrackRow < TRACK_ROW_COUNT){
			
		if(isTrackAtColRow(ballTrackCol,ballTrackRow)){

			let prevBallX= ballX-ballSpeedX;
			let prevBallY= ballY-ballSpeedY;
			let prevTrackCol = Math.floor(prevBallX/TRACK_W);
			let prevTrackRow = Math.floor(prevBallY/TRACK_H);

			let bothTestsFailed = true;

			if(prevTrackCol != ballTrackCol){
				if(isTrackAtColRow(prevTrackCol, prevTrackRow)==false){
					ballSpeedX *=-1
					bothTestsFailed = false;
				}				
			}

			if(prevTrackRow != ballTrackRow){
				if(isTrackAtColRow(prevTrackCol, prevTrackRow)==false){
					ballSpeedY *=-1
					bothTestsFailed = false;
				}
			}

			if(bothTestsFailed) { //armpit case, prevents ball from going right through
				ballSpeedX *=-1;
				ballSpeedY *=-1;
			}

		} // end of track found
	} // end of valid col and row
};

function moveAll(){
	ballMove();
	ballTrackHandling();
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
	// colorCircle(ballX, ballY, 10, 'white'); // draw ball

	if(carPicLoaded){
		canvasContext.drawImage(carPic,
		ballX - carPic.width/2,
		ballY - carPic.height/2 );
	}

	drawTracks();


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