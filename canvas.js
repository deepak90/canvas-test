var canvas, ctxt, fps = 30;

//ball definitions
 var ballRad = 20,
     ballX=20,
     ballSpeedX = 5,
     ballY = 20,
     ballSpeedY = 7;
//paddle definitions

const PADDLE_WIDTH = 100,
      PADDLE_THICKNESS = 10;
var   paddleX = 400;

function updateMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;

    paddleX = mouseX - (PADDLE_WIDTH/2);
}

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    ctxt = canvas.getContext("2d");
    setInterval(updateAll, 1000/fps);
    canvas.addEventListener("mousemove", updateMousePos);
}

var updateAll = function(){
    moveAll();
    drawAll();
};

var moveAll = function() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //Headed left, bounce off the left edge
    if (ballX < (ballRad)) {
        ballSpeedX *= -1;
    }
    //Headed right, bounce off the right edge
    if (ballX > (canvas.width - ballRad)) {
        ballSpeedX = -ballSpeedX;
    }

    //Headed top, bounce off the left edge
    if (ballY < (ballRad)) {
        ballSpeedY *= -1;
    }
    //Headed bottom, bounce off the right edge
    if (ballY > (canvas.height - ballRad)) {
        ballSpeedY = -ballSpeedY;
    }
};
var drawAll = function() {
    //background
    colorRect(0, 0, canvas.width, canvas.height, "black");
    //ball
    colorCircle(ballX, ballY, ballRad, "white");
    //paddle
    colorRect(paddleX, (canvas.height - PADDLE_THICKNESS), PADDLE_WIDTH, PADDLE_THICKNESS, "white");
};

//Helper functions
function colorRect(xPos, yPos, width, height, color) {
    ctxt.fillStyle = color;
    ctxt.fillRect(xPos, yPos, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
    ctxt.fillStyle = color;
    ctxt.beginPath();
    ctxt.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctxt.fill();
}