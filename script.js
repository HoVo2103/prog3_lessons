function main() {
    var socket = io.connect('http://localhost:3000');
    var msg_input = document.getElementById('msg-input');
    var messages = document.getElementById('messages');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
    var buttonDel = document.getElementById('delete');

    function handleSubmit(evt) {
        var val = msg_input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;

    function deleteMsg(evt) {
        socket.emit("delete message");
    }
    buttonDel.onclick = deleteMsg;

    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        messages.appendChild(p);
        msg_input.value = "";
        msg_input.focus();
    }

    function delMsg() {
        while (messages.firstChild) {
            messages.removeChild(messages.lastChild);
        }
    }

    socket.on('display message', handleMessage); // main closing bracket
    socket.on('now you delete', delMsg); // delete message
}

window.onload = main;