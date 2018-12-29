let carPic = document.createElement('img');
let roadPic = document.createElement('img');
let wallPic = document.createElement('img');

let picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady(){	
	picsToLoad--;
	// console.log(picsToLoad)
	if(picsToLoad==0){
		imageLoadingDoneSoStartGame();
	}
};


function beginLoadingImage(imgVar, fileName){
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = fileName;
};

function loadImages() {
	let imageList = [
		{varName: carPic, theFile: "player1car.png"},
		{varName: roadPic, theFile: "track_road.png"},
		{varName: wallPic, theFile: "track_wall.png"}
		];

	picsToLoad = imageList.length;

	for(let i=0;i<imageList.length;i++) {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
	}
}