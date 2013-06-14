//-------------------------
//			Requires
//-------------------------
var net = require('net');
var util = require('./server_data.js');
var fs = require('fs');
var express = app = require('express')
, app = app()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);


//-------------------------
//			Variables
//-------------------------
var clients = [];




//-------------------------
//			INIT
//-------------------------

server.listen(8000);

app.configure(function(){
			  app.use(express.static(__dirname));
			  });
app.get('/', function (req, res) {
		res.sendfile(__dirname + '/map.html');
		});

io.sockets.on('connection', function (socket) {
			  clients.push(socket);
			  
			  socket.emit('init_data', { layers: client_data[0] });
			  socket.on('init_complete', function (data) {
						console.log(data);
						});
			  });

console.log(typeof util);
var n = util.add();
console.log(typeof n);