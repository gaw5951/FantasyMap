var Obj = function() {
	this.verts			= new Array();
	this.name			= 'Unnamed Obj';
	this.id				= '0';
	// lines, curve
	this.drawType		= 'lines';
	this.drawSkip		= 1,
	
	this.fill			= false;
	this.fillColor		= 'red';
	
	this.lineWidth		= 10;
	return this;
}

Obj.prototype.addVert = function(x, y)
{
	this.verts.push({'x': x, 'y':y});
	return this.verts;
}

// ---------------------------------
//		Option Setters
// ---------------------------------

Obj.prototype.set_name	= function(in_v)
{
	if(typeof in_v != "undefined" )
		this.name = in_v;
}

Obj.prototype.set_id = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.id = in_v;
}

Obj.prototype.set_drawType = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.drawType = in_v;
}

Obj.prototype.set_drawSkip = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.drawSkip = in_v;
}

Obj.prototype.set_fill = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.fill = in_v;
}

Obj.prototype.set_fillColor = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.fillColor = in_v;
}

Obj.prototype.set_lineWidth = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.lineWidth = in_v;
}



