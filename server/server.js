//-------------------------
//			Requires
//-------------------------
var net = require('net');
var fs = require('fs');
var path = require('path');
var argv = require('optimist').argv;
var express = app = require('express')
, app = app()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

var sDat = require('./ServerData.js');
var log = require('./Logger.js');
log.set_level(argv.d);
io.set('log level', 1); // reduce logging

//-------------------------
//			Variables
//-------------------------
var clients = [];

//-------------------------
//			INIT
//-------------------------

sDat.preCacheAssets();
server.listen(8000);

//serve the client files in my home dir
app.configure(function(){
			  var pa = path.resolve(__dirname + '/../client/');
			  app.use(express.static(pa));
			  });
//resolve the root web address to our page.
app.get('/', function (req, res) {
		var pa = path.resolve(__dirname + '/../client/map.html');
		res.sendfile(pa);
		});

//socket io with the client where we will be doing all of the interation with
//the clients
io.sockets.on('connection', function (socket) {
			  clients.push(socket);
			  
			  log.log("event - 'connection'");
			  socket.emit('init_data',
						  { data:
							{
								objects: JSON.stringify(sDat.objects),
								layers: JSON.stringify(sDat.layers)
							}
						  });
			  
			  socket.on('init_complete', function (data) {
						
						log.log("event - 'init_complete'");
						log.log(data, 7);
						});
			  
			  socket.on('save_data', function (data) {
						log.log("event - 'save_data'");
						log.log(data, 7);
						});
			  
			  });
log.log("   init - Server Ready ------------------", 0);