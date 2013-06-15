var fs = require('fs');

module.exports = new Env();



function Env()
{
	this.layers			= new Array();	//array of Layer
	this.objects		= new Array();	//array of objs
	this.current_layer	= -1;			//index into layers
	this.objFiles = new Array('square.ini', 'world_outline.ini');
	this.layerFiles = new Array('main_layer.fmd');
	this.A = 'assets/';
	this.O = 'objects/';
	
	this.client_data = {layers: new Array, objects: new Array};
}

// ---------------------------------
//		MARK: Layer Functions
// ---------------------------------
Env.prototype.newLayer = function(name)
{
	if(typeof name == "undefined" )
		name = "New Layer";
	
	var newLayer = new Layer();
	newLayer.name = name;
	this.layers.push(newLayer);
	this.layers.sort(Obj.compare);
	
	return newLayer;
}

Env.prototype.addLayer = function(inLayer)
{
	
	this.layers.push(inLayer);
	this.layers.sort(Obj.compare);
	
	editor.updateLayerList();
	
	return inLayer;
}

Env.prototype.findLayerByName = function(lName)
{
	for(var i = 0; i < _env.layers.length; i ++)
	{
		if(_env.layers[i].name == lName)
		{
			return _env.layers[i];
		}
	}
	return 0;
}

Env.prototype.selectLayerByName = function(lName)
{
	for(var i = 0; i < _env.layers.length; i ++)
	{
		if(_env.layers[i].name == lName)
		{
			this.current_layer = i;
			return i;
		}
	}
	return -1;
}

// ---------------------------------
//		MARK: Object Functions
// ---------------------------------

//unique ids
Env.prototype.addObj = function(oth)
{
	var u_id = true;
	for(var i = 0; i < this.objects.length; i++)
	{
		if(oth.id == this.objects[i].id)
		{
			u_id = false;
			break;
		}
	}
	if(!u_id)
		oth.set_id(_env.getNextObjId());
	
	this.objects.push(oth);
	if(this.current_layer != -1)
		this.layers[this.current_layer].addObj(oth);
}

Env.prototype.getNextObjId = function()
{
	var u_id = 0;
	for(var i = 0; i < this.objects.length; i++)
	{
		if(this.objects[i].id > u_id)
		{
			u_id = this.objects[i].id;
		}
	}
	return (u_id+1);
}

Env.prototype.selectObjectById = function(oId)
{
	for(var i = 0; i < _env.objects.length; i ++)
	{
		if(_env.objects[i].id == oId)
		{
			return _env.objects[i];
		}
	}
	return 0;
}


Env.prototype.preCacheAssets = function()
{
	//layers
	for (var i = 0; i < layerFiles.length; i++)
	{
		client_data.layers.push(fs.readFileSync('./' + O + layerFiles[i]).toString());
	}
	
	//objects
	for (var i = 0; i < objFiles.length; i++)
	{
		client_data.objects.push(fs.readFileSync('./' + O + objFiles[i]).toString());
	}
}
