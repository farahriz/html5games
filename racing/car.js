let carPic = document.createElement('img');
let carPicLoaded = false;

let carX = 75;
let carY = 75;
let carAng = 0;
let carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;

function carReset(){;
	for(let eachRow=0;eachRow<TRACK_ROW_COUNT;eachRow++) {
		for(let eachCol=0;eachCol<TRACK_COL_COUNT;eachCol++) {
			let arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			if(trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
				trackGrid[arrayIndex] = TRACK_ROAD;
				carAng = -Math.PI/2;
				carX = eachCol * TRACK_W + TRACK_W/2;
				carY = eachRow * TRACK_H + TRACK_H/2;
			}
		}
	}
};


function carMove(){
	carSpeed *= GROUNDSPEED_DECAY_MULT

	if(keyHeld_Gas){
		carSpeed +=DRIVE_POWER;
	}
	if(keyHeld_Reverse){
		carSpeed -=REVERSE_POWER;
	}
	if(keyHeld_TurnLeft){
		carAng -=TURN_RATE;
	}
	if(keyHeld_TurnRight){
		carAng +=TURN_RATE;
	}

	carX += Math.cos(carAng) * carSpeed;
	carY += Math.sin(carAng) * carSpeed;

};

function carDraw(){
	if(carPicLoaded){
		drawBitmapWithRotation(carPic, carX,carY, carAng);
	}
}