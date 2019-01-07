
//Player 1 - Arrows
	const KEY_UP_ARROW 		= 38;
	const KEY_LEFT_ARROW 	= 37;
	const KEY_RIGHT_ARROW 	= 39;
	const KEY_DOWN_ARROW 	= 40;


//Player 2 - WASD
	const KEY_W = 88;
	const KEY_A = 65;
	const KEY_S = 83;
	const KEY_D = 68;

// Player 2 - Ergo colemak controls FRST
	const KEY_F = 70; //up
	const KEY_R = 82; //left
	const KEY_T = 84; //right
	//s //down


let mouseX = 0;
let mouseY = 0;


function setupInput(){
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);

}


function updateMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;


	//Tool to test car in any position
		// carX = mouseX;
		// carY = mouseY;

};

function keySet(keyEvent, whichCar, setTo){
	if(keyEvent.keyCode == whichCar.controlKeyLeft){
		whichCar.keyHeld_TurnLeft = setTo;
	}
	if(keyEvent.keyCode == whichCar.controlKeyRight){
		whichCar.keyHeld_TurnRight = setTo;
	}
	if(keyEvent.keyCode == whichCar.controlKeyDown){
		whichCar.keyHeld_Reverse = setTo;
	}
	if(keyEvent.keyCode == whichCar.controlKeyUp){
		whichCar.keyHeld_Gas = setTo;
	}
};


function keyPressed(evt){
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt,blueCar,true);

};

function keyReleased(evt){
	//console.log("Key released: "+evt.keyCode);
	keySet(evt,blueCar,false);

};
