module.exports =  new Logger();

var fs = require('fs');
var path = require('path');

function Logger()
{
	
	this.level = 1;
	//levels:
	//	0 - minimal
	//	1 - normal
	//
	//	6 - verbose
	//	7 - debug
	if(typeof level != "undefined" )
		this.level = level;
}

Logger.prototype.set_level = function(level)
{
	this.level = level;
	if(typeof level == "undefined" )
		this.level = 1;
}

Logger.prototype.log = function(text, level)
{
	if(typeof level == "undefined" )
		level = 1;
	
	if(level <= this.level)
	{
		console.log(text);
	}
}


//logger.log("Printing ALL SIO TRRAFIC", 6); //6 being verbose