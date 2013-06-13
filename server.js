/*var connect = require('connect');
connect.createServer(			 
		connect.logger({ immediate: true, format: 'default' }),
		connect.static(__dirname)
).listen(8000);*/

var fs = require('fs');
var express = app = require('express')
, app = app()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);


server.listen(8000);

app.configure(function(){
			  app.use(express.static(__dirname));
			  });
app.get('/', function (req, res) {
		res.sendfile(__dirname + '/map.html');
		});

io.sockets.on('connection', function (socket) {
			  
			  socket.emit('init_data', { layers: client_data[0] });
			  socket.on('init_complete', function (data) {
						console.log(data);
						});
			  });

var clients = [];
var client_data = [];


// load main_layer.fmd
fs.readFile('./objects/main_layer.fmd', function (err, data) {
			if (err) throw err;
			console.log(data);
			client_data[0] = data.toString();
			});