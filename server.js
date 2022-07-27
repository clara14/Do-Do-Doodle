var express = require('express');
var path = require('path');
var app = express();
var agx = require('./game');

// express app
app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname,'client')));
});

var server = require('http').createServer(app).listen(process.env.PORT || 8080);

var io = require('socket.io').listen(server);

io.set('log level',1);

// listen for connections
io.sockets.on('connection', function (socket) {
    console.log('client connected');
    agx.initGame(io, socket);
});


