var fs = require('fs');

module.exports =  new ObjFac();

function ObjFac()
{
	//w/e
}

ObjFac.prototype.add = function()
{
	return new Obj();
	
}


// Include Client Object (not the best method)
eval(fs.readFileSync(__dirname + '/../client/Obj.js')+'');


