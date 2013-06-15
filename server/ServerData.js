module.exports =  new ServerData();

var fs = require('fs');
var path = require('path');
var LayerFac = require('./LayerFac.js');
var ObjFac = require('./ObjFac.js');

function ServerData()
{
	this.objects_file_contents = new Array;
	this.layers_file_contents = new Array;
	
	this.objFiles = new Array('square.ini', 'world_outline.ini');
	this.layerFiles = new Array('main_layer.fmd');
}

ServerData.prototype.preCacheAssets = function()
{
	var pa = path.resolve(__dirname + '/../objects');
	//objects
	for (var i = 0; i < this.objFiles.length; i++)
	{
		this.objects_file_contents.push(
			fs.readFileSync(pa + '/' + this.objFiles[i]).toString());
	}
	
	//layers
	for (var i = 0; i < this.layerFiles.length; i++)
	{
		this.layers_file_contents.push(
			fs.readFileSync(pa + '/' + this.layerFiles[i]).toString());
	}
	
}