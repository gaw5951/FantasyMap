var fs = require('fs');

module.exports =  new ObjFac();

function ObjFac()
{
	//w/e
}

ObjFac.prototype.newObjFromJSON = function(jsStr)
{
	var inObj = JSON.parse(jsStr);
	var retObj = new Obj();
	var myarr = inObj.verts.split(";");
	
	retObj.set_id(inObj.id);
	retObj.set_name(inObj.name);
	
	retObj.set_lineWidth(inObj.lineWidth);
	retObj.set_fill(inObj.fill);
	retObj.set_fillColor(inObj.fillColor);
	retObj.set_drawType(inObj.drawType);
	retObj.set_drawSkip(inObj.drawSkip);
	
	for (var j = 0; j < myarr.length; j++)
	{
		if (myarr[j] != "" && j % retObj.drawSkip == 0)
		{
			var t = myarr[j].split(',');
			t[0] = (t[0] * 10) - 23040; //-22080;
			t[1] = (t[1] * 10) - 17280; //34560;//-21720;
			retObj.addVert(t[0], t[1]);
		}
	}
	
	return retObj;
}

ObjFac.prototype.JSONStrFromObj = function(inObj)
{
	return JSON.stringify(inObj);
}

// Include Client Object (not the best method)
eval(fs.readFileSync(__dirname + '/../client/Obj.js')+'');


