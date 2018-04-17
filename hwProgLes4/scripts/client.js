var socket = io.connect('http://localhost:3000');

var size, clr;
var data = {};
// var contentArr = [];

// canvas
function setup() {
    createCanvas(windowWidth - 35, 600).parent("#container");
    background("#acacac");

    frameRate(60);
}

function draw() {
    socket.on("display canvas content", function (obj) {
        size = obj.size;
        clr = obj.color;
        var X = obj.X;
        var Y = obj.Y;

        fill(0, 0, clr);
        ellipse(X, Y, size, size);
    });

    socket.on("delete your content", function () {
        background("#acacac");
    });
}

function mouseDragged() {
    if (mouseButton == "left") {
        size = 10;
        clr = random(100, 250);
        data = {
            "X": mouseX,
            "Y": mouseY,
            "size": size,
            "color": clr
        };

        fill(0, 0, clr);
        ellipse(mouseX, mouseY, size, size);
        // write points
        socket.emit("write into canvas", data);
    }
}

// page script
$(document).ready(function () {
    $("#del-btn").click(function () {
        background("#acacac");
        socket.emit("delete canvas content");
    });
});