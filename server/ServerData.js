module.exports =  new ServerData();

var fs = require('fs');

function ServerData()
{
	this.objects = new Array;
	this.layers = new Array;
	
	this.objFiles = new Array('square.ini', 'world_outline.ini');
	this.layerFiles = new Array('main_layer.fmd');
}

ServerData.prototype.preCacheAssets = function()
{
	//layers
	for (var i = 0; i < layerFiles.length; i++)
	{
		layers.push(fs.readFileSync('./' + O + layerFiles[i]).toString());
	}
	
	//objects
	for (var i = 0; i < objFiles.length; i++)
	{
		objects.push(fs.readFileSync('./' + O + objFiles[i]).toString());
	}
}