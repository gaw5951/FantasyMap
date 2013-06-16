var Layer = function()
{
	this.name		= 'Layer';
	this.prio		= Layer.__next_prio;
	this.l_objs		= new Array();		//array of Obj ids
	this.visible	= 0;
	
	Layer.__next_prio++;
}

//static variable
Layer.__next_prio = 0;

//we want the greatest prio value to be drawn first.
Layer.prototype.compare = function(this_, oth)
{
	return (this_.prio - oth.prio);
}


// ---------------------------------
//			MARK: Functions
// ---------------------------------
Layer.prototype.addObj = function(oth)
{
	this.l_objs.push(oth.id);
}

Layer.prototype.addObjById = function(id)
{
	this.l_objs.push(id);
}

//  ---------------------------------
//			MARK: Setters
// ---------------------------------
Layer.prototype.set_name	= function(in_v)
{
	if(typeof in_v != "undefined" )
		this.name = in_v;
}

Layer.prototype.set_prio	= function(in_v)
{
	if(typeof in_v != "undefined" )
	{
		this.prio = in_v;
		__next_prio = in_v+1;
	}
}

Layer.prototype.set_l_objs	= function(in_v)
{
	if(typeof in_v != "undefined" )
		this.l_objs = in_v;
}

Layer.prototype.set_visible	= function(in_v)
{
	if(typeof in_v != "undefined" )
		this.visible = in_v;
}


