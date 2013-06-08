function selectLayer(layer)
{
	_env.selectLayerByName(layer.value);
}

function updateLayerList()
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
	
}