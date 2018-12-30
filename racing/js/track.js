const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COL_COUNT = 20;
const TRACK_ROW_COUNT = 15;
let trackGrid = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
				 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
				 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
				 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
				 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
				 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;


function isObstacleAtColRow(col,row){
	if(col >= 0  && col < TRACK_COL_COUNT && 
	   row >= 0 && row < TRACK_ROW_COUNT){
		let trackIndexUnderCoord = rowColToArrayIndex(col,row);
		return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);		
	} else {
		return false;
	}
};

function carTrackHandling(whichCar){
	let carTrackCol = Math.floor(whichCar.x / TRACK_W);
	let carTrackRow = Math.floor(whichCar.y / TRACK_H);
	let trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow)
	
	if(carTrackCol >= 0  && carTrackCol < TRACK_COL_COUNT && 
		carTrackRow >= 0 && carTrackRow < TRACK_ROW_COUNT){
			
		if(isObstacleAtColRow(carTrackCol,carTrackRow)){
			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
			whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

			whichCar.speed *=-0.5
		} // end of track found
	} // end of valid col and row
};

function rowColToArrayIndex(col,row){
	return col + TRACK_COL_COUNT * row;
};

function drawTracks() {

	let arrayIndex = 0;
	let drawTileX = 0;
	let drawTileY = 0;

	for(let eachRow=0;eachRow<TRACK_ROW_COUNT;eachRow++) {
		for(let eachCol=0;eachCol<TRACK_COL_COUNT;eachCol++) {
			let tileKindHere = trackGrid[arrayIndex];
			let useImg = trackPics[tileKindHere];

			canvasContext.drawImage(useImg, drawTileX,drawTileY);
			arrayIndex++;
			drawTileX += TRACK_W;

		} // end of for each col
		drawTileY += TRACK_H;
		drawTileX = 0; //reset draw line row
	} // end of for each row

} // end of drawTracks func