var photo = document.getElementById("photo");
var context = photo.getContext("2d");
var width = photo.width;
var height = photo.height;
var video = document.getElementById('video');
var board = document.getElementById("board");
var bctx = board.getContext("2d");

var isStreamSupported = function() {
    if (navigator.mediaDevices && navigator.getUserMedia) {
	return true;
    }
    return false;
}


var getCamera = function() {
    if (isStreamSupported()) {
	navigator.getUserMedia({video:true},handleVideo,videoError);
    }
}

var handleVideo = function(stream) {
    video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
    alert("bad");
}

var draw = function() {
    var bImgData = snapPhoto();
    setBoard(bImgData);
}


var snapPhoto = function() {
    context.drawImage(video,0,0,width,height); //x,y,width,length
    var imgData = context.getImageData(0,0,width,height);
    var data = imgData.data;
    
    var bImgData = bctx.getImageData(0,0,width,height);
    var bData = bImgData.data;
    
    for (var i = 0; i < data.length; i+=4) {
	if (colorFound(data[i],data[i+1],data[i+2])) {		
	    bData[i] = data[i];
	    bData[i+1] = data[i+1];
	    bData[i+2] = data[i+2];
	    bData[i+3] = data[i+3];
	}
    }
    photo.style.display = "none";
    return bImgData;
}


var setBoard = function(imgData) {
    bctx.putImageData(imgData,0,0);
}


var percentError = function(real,expected) {
    return Math.abs(expected-real)*100/expected;
}


var colorFound = function(r,g,b) {
    return b > 100 && (b > 1.5 * r) && (b > 1.5 * g)    
}


getCamera();

video.style.cssText = "-moz-transform: scale(-1, 1); \
-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
transform: scale(-1, 1); filter: FlipH;";

board.style.cssText = "-moz-transform: scale(-1, 1); \
-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
transform: scale(-1, 1); filter: FlipH;";

video.style.display = "none";
photo.style.display = "none";
board.style.border = "2px solid black";

setInterval(function() {draw();},0);
