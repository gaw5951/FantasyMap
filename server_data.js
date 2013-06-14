module.exports =  new LayerFac();

function LayerFac()
{
	//w/e
}

LayerFac.prototype.add = function(name)
{
	return new Layer();
	
}

var Layer = function Layer()
{
	this.name = 'layer';
}