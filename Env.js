var Env = function()
{
	this.layers			= new Array();	//array of Layer
	this.objects		= new Array();	//array of objs
	this.current_layer	= -1;			//index into layers
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
	
	editor.updateLayerList();
	
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
