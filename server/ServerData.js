module.exports =  new ServerData();

var fs = require('fs');
var path = require('path');
var LayerFac = require('./LayerFac.js');
var ObjFac = require('./ObjFac.js');
var log = require('./Logger.js');

function ServerData()
{
	this.objects_file_contents = new Array;
	this.layers_file_contents = new Array;
	
	this.objFiles = new Array('square.ini', 'world_outline.ini');
	this.layerFiles = new Array('main_layer.fmd');
	
	this.objects = new Array;
	this.layers = new Array;
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
	log.log("   init - Loading Asset Files Complete.");
	log.log(JSON.stringify(this),7);
	
	for (var i = 0; i < this.objects_file_contents.length; i++)
	{
		this.objects.push(ObjFac.newObjFromJSON(this.objects_file_contents[i]));
	}
	
	for (var i = 0; i < this.layers_file_contents.length; i++)
	{
		this.layers.push(LayerFac.newLayerFromJSON(this.layers_file_contents[i]));
	}
	log.log("   init - Parsing JSON Objects Complete.");
	log.log(JSON.stringify(this),7);
}