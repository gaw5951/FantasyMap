var Env = function()
{
	this.layers			= new Array();	//array of Layer
	this.objects		= new Array();	//array of objs
	this.current_layer	= 0;			//index into layers
}

// ---------------------------------
//		MARK: Layer Functions
// ---------------------------------
Env.prototype.newLayer = function(name)
{
	var newLayer = new Layer();
	newLayer.name = name;
	this.layers.push(newLayer);
	this.layers.sort(Obj.compare);
	
	updateLayerList();
	
	return newLayer;
}

Env.prototype.addLayer = function(inLayer)
{
	
	this.layers.push(inLayer);
	this.layers.sort(Obj.compare);
	
	updateLayerList();
	
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
	if(u_id)
		this.objects.push(oth);
	
	return u_id;
}