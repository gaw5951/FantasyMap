module.exports =  new Logger();

var fs = require('fs');
var path = require('path');

function Logger(level)
{
	
	this.level = 0;
	//levels:
	//	0 - all
	//
	//
	//	6 - debug
	if(typeof level != "undefined" )
		this.level = level;
	
	
}

Logger.prototype.log = function(text, level)
{
	if(typeof level == "undefined" )
		level = 0;
	
	switch(level)
	{
		case 1:
			//
			break;
		case 2:
			//
			break;
		default:
			//
			break;
	}
	
	console.log(text);
}