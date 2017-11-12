var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

document.getElementById("snap").addEventListener("click",function() {snapPhoto()});

var isStreamSupported = function() {
    if (navigator.mediaDevices && navigator.getUserMedia) {
	return true;
    }
    return false;
}


var video = document.getElementById('video');
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

getCamera();


var snapPhoto = function() {
    context.drawImage(video,0,0,width,height); //x,y,width,length
    var data = context.getImageData(0,0,width,height).data;
    console.log(data.length);
    for (var i = 0; i < canvas.width*canvas.height-3; i+=4) {
	if (colorFound(data[i],data[i+1],data[i+2])) {
	    console.log("yes");
	    //console.log(i);
	    //console.log(i/4);
	    console.log(data[i],data[i+1],data[i+2]);
	    
	    //console.log([Math.floor(i/3), Math.floor(i/3/width),Math.floor(i/3%width)]);
	    return [Math.floor(i/3/width),Math.floor(i/3%width)];
	    // i/3 is pixel number
	    // there are width pixels in a row
	    // to get col position i/3 % width
	    // to get row position i/3 / width
	}
	
    }
    console.log("no");
    console.log(data);
    return null;
    //canvas.style.display = "none";
}


var percentError = function(real,expected) {
    return Math.abs(expected-real)*100/expected;
}


var colorFound = function(r,g,b) {
    //return g > 120 && (g > 1.7 * r) && (g > 1.7 * b)
    //return r > 120 && (r > 1.7 * b) && (r > 1.7 * g)
    return b > 100 && (b > 1.5 * r) && (b > 1.5 * g)
    
    
}

