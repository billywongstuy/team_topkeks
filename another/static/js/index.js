var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;

document.getElementById("snap").addEventListener("click",function() {draw()});

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



var board = document.getElementById("board");
var bctx = board.getContext("2d");
board.style.border = "5px solid black";


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
	    console.log("yes");
	    console.log(data[i],data[i+1],data[i+2]);
	    console.log(i,i+1,i+2);

	    /*
	    bctx.fillStyle = 'rgba(' + data[i] + ','
		+ data[i+1] + ','
		+ data[i+2] + ','
		+ data[i+3] + ')';

	    bctx.fillRect(i%width,Math.floor(i/width),1,1);
	    */

		
	    bData[i] = data[i];
	    bData[i+1] = data[i+1];
	    bData[i+2] = data[i+2];
	    console.log(data[i+3]);
	    bData[i+3] = data[i+3];
	    
	    
	}

	//36 69 106
	//2283532
	
    }

	/*
    console.log(bImgData); //the values are in here
    bctx.putImageData(bImgData,0,0);

    console.log(bImgData); //values are in here
    console.log(bctx.getImageData(0,0,width,height)); //values dont move to here
    console.log(bImgData); //the values are in here
    */

    //31 69 184
    //2284120
    

    //bctx.putImageData(imageData, 0, 0);
    //setImageData(bctx,bImgData);
    
    //console.log("no");
    //console.log(data);
    //return null;
    //canvas.style.display = "none";

    return bImgData;
    
}


var setBoard = function(imgData) {
    bctx.putImageData(imgData,0,0);
}


var percentError = function(real,expected) {
    return Math.abs(expected-real)*100/expected;
}


var colorFound = function(r,g,b) {
    //return g > 120 && (g > 1.7 * r) && (g > 1.7 * b)
    //return r > 120 && (r > 1.7 * b) && (r > 1.7 * g)
    return b > 100 && (b > 1.5 * r) && (b > 1.5 * g)
    
    
}


var grayscale = function() {
    var imageData = context.getImageData(0,0,width,height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    context.putImageData(imageData, 0, 0);
  };



var invert = function() {
    var imageData = bctx.getImageData(0,0,width,height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    console.log("called");
    bctx.putImageData(imageData, 0, 0);
  };


var setImageData = function(ctx,imageData) {
    ctx.putImageData(imageData, 0, 0);
  };


/*
var bImgData = bctx.getImageData(0,0,width,height)
var bData = bImgData.data;

for() {
    bData[i] = data[i];
    bData[i+1] = data[i+1];
    bData[i+2] = data[i+2];
    console.log(bData[i]);
    
    
}

bctx.putImageData(bImgData,0,0);
*/
