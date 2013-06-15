var fs = require('fs');

module.exports =  new LayerFac();

function LayerFac()
{
	//w/e
}

LayerFac.prototype.add = function(name)
{
	return new Layer();
	
}


// Include Client Layer Object (not the best method)
eval(fs.readFileSync(__dirname + '/../client/Layer.js')+'');


