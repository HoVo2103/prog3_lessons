var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messagesArr = [];

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

io.on('connection', function (socket) {
    for (var i in messagesArr) {
        io.sockets.emit("display message", messagesArr[i]);
    }

    socket.on("send message", function (data) {
        messagesArr.push(data);
        io.sockets.emit("display message", data);
    });

    socket.on("delete message", function () {
        messagesArr = [];
        io.sockets.emit("now you delete");
    });
});