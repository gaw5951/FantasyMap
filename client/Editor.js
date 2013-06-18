//editor variable to make calls clear
//TODO: NEED TO MAKE THE OBJECT CREATION Click button change properties not change properties click button

var editor = function()
{
	this.currObj = 0;
	//modes
	//0 = nothing, move etc works as normal
	//1 = new object, add points
	this.mode = 0;
};

editor.selectLayer = function selectLayer(layer)
{
	_env.selectLayerByName(layer.value);
	editor.updateObjList();
}

editor.selectObj = function selectObj(obj)
{
	//select obj for editing etc
	var oList = document.getElementById('object_list');
	var objId = oList.options[oList.selectedIndex].attributes['valueid'].value;
	this.currObj = _env.selectObjectById(objId);
	this.updateObjProps();
}

editor.updateObjProps = function updateObjProps()
{
	//select obj for editing etc
	var oId				= document.getElementById('obj_id');
	var oName			= document.getElementById('obj_name');
	var ostrokeStyle	= document.getElementById('obj_strokeStyle');
	var oFill			= document.getElementById('obj_fill');
	var oFillColor		= document.getElementById('obj_fillColor');
	var oDrawType		= document.getElementById('obj_drawType');
	var oDrawSkip		= document.getElementById('obj_drawSkip');
	
	oId				.value = this.currObj.id;
	oName			.value = this.currObj.name;
	ostrokeStyle	.value = this.currObj.strokeStyle;
	oFill			.value = this.currObj.fill;
	oFillColor		.value = this.currObj.fillColor;
	oDrawType		.value = this.currObj.drawType;
	oDrawSkip		.value = this.currObj.drawSkip;
	
	
	//add hooks here so every callbacks directly change the object?
}

editor.updateLayerList = function updateLayerList()
{
	var lList = document.getElementById('layer_list');
	var optionTags = lList.getElementsByTagName('option');
	
	for(var i = 0; i < _env.layers.length; i ++)
	{
		var inDisplayList = false;
		
		for(var j = 0; j < optionTags.length; j++)
		{
			if(_env.layers[i].name == optionTags[j].value)
			{
				inDisplayList = true;
				break;
			}
		}
		
		if(!inDisplayList)
		{
			//add to lList
			var newField = document.createElement('option');
			newField.innerHTML = _env.layers[i].name;
			lList.appendChild(newField);
		} else
		{
			inDisplayList = false;
		}
	}
	this.updateObjList();
}

editor.updateObjList = function updateObjList()
{
	var oList = document.getElementById('object_list');
	var optionTags = oList.getElementsByTagName('option');

	oList.innerHTML = '';
	
	if(_env.current_layer != -1)
	{
		var layer_objs = _env.layers[_env.current_layer].l_objs;
		for(var i = 0; i < layer_objs.length; i++)
		{
			var newField = document.createElement('option');
			newField.setAttribute('valueid', _env.objects[layer_objs[i]].id);
			newField.innerHTML = _env.objects[layer_objs[i]].name;
			oList.appendChild(newField);
		}
	}
}

editor.newLayer = function newLayer(e)
{
	//e.preventDefault();
	_env.newLayer(e.name.value);
}

editor.newObj = function newObj(e)
{
	var oth = new Obj();
	
	oth.set_name(e.name.value);
	oth.set_lineWidth(e.lineWidth.value);
	oth.set_fillColor(e.fillColor.value);
	
	this.currObj = oth;
	_env.addObj(oth);
	this.mode = 1;
	this.updateObjList();
}

editor.endObj = function endNewObj()
{
	currObj = null;
	this.mode = 0;
}