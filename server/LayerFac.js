var fs = require('fs');

module.exports =  new LayerFac();

function LayerFac()
{
	//w/e
}

LayerFac.prototype.newLayerFromJSON = function(jsStr)
{
	var inLayer = JSON.parse(jsStr);
	var retLayer = new Layer();
	
	retLayer.set_name(inLayer.name);
	retLayer.set_l_objs(inLayer.l_objs);
	retLayer.set_prio(inLayer.prio);

	return retLayer;
	
}


// Include Client Layer Object (not the best method)
eval(fs.readFileSync(__dirname + '/../client/Layer.js')+'');


