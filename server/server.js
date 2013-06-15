//-------------------------
//			Requires
//-------------------------
var net = require('net');
var fs = require('fs');
var path = require('path');
var express = app = require('express')
, app = app()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

var sDat = require('./ServerData.js');

//-------------------------
//			Variables
//-------------------------
var clients = [];




//-------------------------
//			INIT
//-------------------------

server.listen(8000);

app.configure(function(){
			  var pa = path.resolve(__dirname + '/../client/');
			  app.use(express.static(pa));
			  });
app.get('/', function (req, res) {
		var pa = path.resolve(__dirname + '/../client/map.html');
		res.sendfile(pa);
		});

io.sockets.on('connection', function (socket) {
			  clients.push(socket);
			  
			  socket.emit('init_data', { layers: 'nutin'});
			  socket.on('init_complete', function (data) {
						console.log(data);
						});
			  });

sDat.preCacheAssets();