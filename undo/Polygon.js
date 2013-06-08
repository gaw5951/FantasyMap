var Polygon = function() {
	this.verts = new Array();
	this.name			= 'Unnamed Polygon';
	this.id				= '0';
	// lines, curve
	this.drawType		= 'lines';
	this.drawSkip		= 1,
	
	this.fill			= false;
	this.fillColor		= 'red';
	
	this.lineWidth		= 10;
	return this;
}

Polygon.prototype.addVert = function(x, y)
{
	this.verts.push({'x': x, 'y':y});
	return this.verts;
}

/* 
-----------------------
	Option Setters
-----------------------
*/
 
Polygon.prototype.set_name	= function(in_v)
{
	if(typeof in_v != "undefined" )
		this.name = in_v;
}

Polygon.prototype.set_id = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.id = in_v;
}

Polygon.prototype.set_drawType = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.drawType = in_v;
}

Polygon.prototype.set_drawSkip = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.drawSkip = in_v;
}

Polygon.prototype.set_fill = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.fill = in_v;
}

Polygon.prototype.set_fillColor = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.fillColor = in_v;
}

Polygon.prototype.set_lineWidth = function(in_v)
{
	if(typeof in_v != "undefined" )
		this.lineWidth = in_v;
}



