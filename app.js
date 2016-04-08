var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function(socket) {
    socket.emit('news', {
        hello: 'world'
    });

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('areaMsg', function(data) {
        console.log(data);
    });
});
