function warriorClass(){
	this.x = 75;
	this.y = 75;
	
	PLAYER_MOVE_SPEED = 

	this.myCarPic; // which picture to use
	this.name = "Untitled Car"

	this.keyHeld_Up 	= false;
	this.keyHeld_Down 	= false;
	this.keyHeld_Left 	= false;
	this.keyHeld_Right 	= false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey){
		this.controlKeyUp 		= upKey;
		this.controlKeyRight 	= rightKey;
		this.controlKeyDown		= downKey;
		this.controlKeyLeft 	= leftKey;
	}



	this.reset = function(whichImage, carName){
		this.name = warriorName;
		this.myCarPic = whichImage;
		this.speed = 0;
		for(let eachRow=0;eachRow<TRACK_ROW_COUNT;eachRow++) {
			for(let eachCol=0;eachCol<TRACK_COL_COUNT;eachCol++) {
				let arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI/2;
					this.x = eachCol * TRACK_W + TRACK_W/2;
					this.y = eachRow * TRACK_H + TRACK_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("No player start found")
	}; // end of function Reset()


	// this.move = function(){
	// 	this.speed *= GROUNDSPEED_DECAY_MULT

	// 	if(this.keyHeld_Gas){
	// 		this.speed +=DRIVE_POWER;
	// 	}
	// 	if(this.keyHeld_Reverse){
	// 		this.speed -=REVERSE_POWER;
	// 	}
	// 	if (Math.abs(this.speed)>MIN_SPEED_TO_TURN){
			
	// 		if(this.keyHeld_TurnLeft){
	// 			this.ang -=TURN_RATE;
	// 		}
	// 		if(this.keyHeld_TurnRight){
	// 			this.ang +=TURN_RATE;
	// 		}
	// 	}


	// 	this.x += Math.cos(this.ang) * this.speed;
	// 	this.y += Math.sin(this.ang) * this.speed;

	// 	carTrackHandling(this);
	// }; // end of Move

	this.move = function(){
		
		if(this.keyHeld_Up){
			this.speedY == 5
			console.log("Up")
		}

		if(this.keyHeld_Down){
			this.speedY == 5
		}

		if(this.keyHeld_Left){
			this.speedX == 5
		}

		if(this.keyHeld_Right){
			this.speedX == 5
		}

		this.y += this.speedY
		this.x += this.speedX

	}; // end of Move



	this.draw = function(){
		drawBitmapCentered(this.myCarPic, this.x,this.y);
	};

	
}; // end of Class





