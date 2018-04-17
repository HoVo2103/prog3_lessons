var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("../"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var pointsArr = [];

io.on('connection', function (socket) {
    // Send all canvas content
    for (var i in pointsArr) {
        io.sockets.emit("display canvas content", pointsArr[i]);
    }
    // modify canvas content
    socket.on("write into canvas", function (data) {
        pointsArr.push(data);
        io.sockets.emit("display canvas content", data);
    });
    // delete canvas content
    socket.on("delete canvas content", function () {
        pointsArr = [];
        io.sockets.emit("delete your content");
    });
});