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
				 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
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
		return (trackGrid[trackIndexUnderCoord] == TRACK_WALL);		
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
			
		if(isObstacleAtColRow(carTrackCol,carTrackRow)){
			carX -= Math.cos(carAng) * carSpeed;
			carY -= Math.sin(carAng) * carSpeed;

			carSpeed *=-0.5
		} // end of track found
	} // end of valid col and row
};

function rowColToArrayIndex(col,row){
	return col + TRACK_COL_COUNT * row;
};

function drawTracks() {

	for(var eachRow=0;eachRow<TRACK_ROW_COUNT;eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COL_COUNT;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = trackGrid[arrayIndex];
			var useImg;
			switch(tileKindHere) {
				case TRACK_ROAD:
					useImg = roadPic;
					break;
				case TRACK_WALL:
					useImg = wallPic;
					break;
				case TRACK_GOAL:
					useImg = goalPic;
					break;
				case TRACK_TREE:
					useImg = treePic;
					break;
				case TRACK_FLAG:
					useImg = flagPic;
					break;
			}

			canvasContext.drawImage(useImg,
					TRACK_W*eachCol,TRACK_H*eachRow);

		} // end of for each col
	} // end of for each row

} // end of drawTracks func