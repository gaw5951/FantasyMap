/*todo:
 -loading of assets streamline
 -zoom to location and possible +/- zoom buttons
 -distance/ruler
 -keyboard nav
 -color groups - same idea as style sheet (one change all change)
 -layers
 -editor
 
 notes:
 -Set distances and when the distance is set disallow zooming beyond that point
 */


// ---------------------------------
//    	MARK: CONSTS
// ---------------------------------
var A = 'assets/';
var O = 'objects/';
var DOWNLOAD_URI = '<a href="data:application/octet-stream,field1%2Cfield2%0Afoo%2Cbar%0Agoo%2Cgai%0A">CSV</a>';
var res_data = 0;

// ---------------------------------
//		MARK: Load Assets
// ---------------------------------
$(document).ready(function()
				  {
				  var objFiles = new Array(O + 'square.ini', O + 'world_outline.ini');
				  var layerFiles = new Array(O + 'main_layer.fmd');
				  
				  var divObjs = document.getElementById('vert_objects');
				  var divLayers = document.getElementById('layer_objects');
				  
				  
				  var addr = document.URL.replace(new RegExp('/','gm'),'').split(':');
				  var socket = io.connect('http://' + addr[1] + ':8000');
				  socket.on('init_data', function (data) {
							console.log(data);
							res_data = data;
							socket.emit('init_complete', true);
							});
				  /*
				  for (var i = 0; i < objFiles.length; i++)
				  {
				  (function(iter)
				   {
				   $.ajax(
						  {
						  async: false,
						  type: 'GET',
						  url: objFiles[iter],
						  success: function(data)
						  {
						  var myvar = data;
						  var idstr = 'objs_' + iter;
						  var newField = document.createElement('input');
						  newField.setAttribute('id', idstr);
						  newField.setAttribute('type', 'hidden');
						  newField.setAttribute('value', myvar);
						  divObjs.appendChild(newField);
						  }
						  });
				   })(i);
				  }
				  
				  for (var i = 0; i < layerFiles.length; i++)
				  {
				  (function(iter)
				   {
				   $.ajax(
						  {
						  async: false,
						  type: 'GET',
						  url: layerFiles[iter],
						  success: function(data)
						  {
						  var myvar = data;
						  var idstr = 'layer_' + iter;
						  var newField = document.createElement('input');
						  newField.setAttribute('id', idstr);
						  newField.setAttribute('type', 'hidden');
						  newField.setAttribute('value', myvar);
						  divLayers.appendChild(newField);
						  }
						  });
				   })(i);
				  }*/
				  
				  });

function loadAssets()
{
	loadLayers();
	loadObjs();
}

function loadLayers()
{
	var divLayers = document.getElementById('layer_objects');
	var objs_x = divLayers.getElementsByTagName('input');
	var curr_layer = 0;
	
	for (var i = 0; i < objs_x.length; i++)
	{
		curr_layer = new Layer;
		var jsonObj = objs_x[i].value;
		var inLayer = jQuery.parseJSON(jsonObj);
		
		curr_layer.set_name(inLayer.name);
		curr_layer.set_l_objs(inLayer.l_objs);
		curr_layer.set_prio(inLayer.prio);
		
		_env.addLayer(curr_layer);
	}
	editor.updateLayerList();
}

function loadObjs()
{
	var divObjs = document.getElementById('vert_objects');
	var objs_x = divObjs.getElementsByTagName('input');
	var curr_Obj = 0;
	
	for (var i = 0; i < objs_x.length; i++)
	{
		
		curr_Obj = new Obj;
		var jsonObj = objs_x[i].value;
		var inObj = jQuery.parseJSON(jsonObj);
		var myarr = inObj.verts.split(";");
		
		curr_Obj.set_id(inObj.id);
		curr_Obj.set_name(inObj.name);
		
		curr_Obj.set_lineWidth(inObj.lineWidth);
		curr_Obj.set_fill(inObj.fill);
		curr_Obj.set_fillColor(inObj.fillColor);
		curr_Obj.set_drawType(inObj.drawType);
		curr_Obj.set_drawSkip(inObj.drawSkip);
		
		//load verts
		for (var j = 0; j < myarr.length; j++)
		{
			if (myarr[j] != "" && j % curr_Obj.drawSkip == 0)
			{
				var t = myarr[j].split(',');
				t[0] = (t[0] * 10) - 23040; //-22080;
				t[1] = (t[1] * 10) - 17280; //34560;//-21720;
				curr_Obj.addVert(t[0], t[1]);
			}
		}
		_env.addObj(curr_Obj);
	}
}

// ---------------------------------
//		MARK: Variables
// ---------------------------------
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// View Variables
var scaleFactor = 1.1;
var lastX = canvas.width / 2,
lastY = canvas.height / 2;
var dragStart, dragged;

var _env = new Env();

// ---------------------------------
//		MARK: OnLoad, Add Events
// ---------------------------------
window.onload = function()
{
	trackTransforms(ctx);
	
	// -----------------------
	//	Load Assets
	// -----------------------
	loadAssets();
	
	// -----------------------
	//	Initial draw
	// -----------------------
	draw();

	// -----------------------
	//	Attach Events
	// -----------------------
	canvas.addEventListener('mousedown', handleMouseDown, false);

	canvas.addEventListener('mousemove', handleMouseMove, false);
	
	canvas.addEventListener('keydown', handleKeyDown, false);
	
	canvas.addEventListener('mouseup', handleMouseUp, false);
	
	canvas.addEventListener('DOMMouseScroll', handleScroll, false);
	
	canvas.addEventListener('mousewheel', handleScroll, false);

};

// ---------------------------------
//		MARK: Event Handlers
// ---------------------------------
function handleMouseDown(evt)
{
	document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	//var b1 = document.getElementById('box1');
	var pt = ctx.transformedPoint(evt.offsetX, evt.offsetY);
	//b1.value = '(' + evt.offsetX + ',' + evt.offsetY + ')' + '(' + pt.x + ',' + pt.y + ')';
	dragStart = ctx.transformedPoint(lastX, lastY);
	dragged = false;
}

function handleMouseMove(evt)
{
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	dragged = true;
	if (dragStart)
	{
		var pt = ctx.transformedPoint(lastX, lastY);
		ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
		draw();
	}
}

function handleKeyDown(evt)
{
	console.log(evt.keyCode);
	switch (evt.keyCode)
	{
		case 37:
			ctx.translate(25, 0);
			break;
		case 38:
			ctx.translate(0, 25);
			break;
		case 39:
			ctx.translate(-25, 0);
			break;
		case 40:
			ctx.translate(0, -25);
			break;
		default:
			break;
	}
	
	draw();
}

function handleMouseUp(evt)
{
	dragStart = null;
	lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
	lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
	var pt = ctx.transformedPoint(lastX, lastY);
	if(editor.mode == 1) //TODO: pass in the mouse evnets and handle logic there
	{
		editor.currObj.addVert(pt.x, pt.y);
	}
	//if (!dragged) zoom(evt.shiftKey ? -1 : 1);
	draw();
}

function handleScroll(evt)
{
	var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
	if (delta) zoom(delta);
	return evt.preventDefault() && false;
}

// ---------------------------------
//		MARK: Zoom and Transform Functions
// ---------------------------------
function zoom(clicks)
{
	var pt = ctx.transformedPoint(lastX, lastY);
	ctx.translate(pt.x, pt.y);
	var factor = Math.pow(scaleFactor, clicks);
	ctx.scale(factor, factor);
	ctx.translate(-pt.x, -pt.y);
	draw();
}

// ---------------------------------
//		MARK: Drawing functions
// ---------------------------------
function draw()
{
	// Clear the entire canvas
	var p1 = ctx.transformedPoint(0, 0);
	var p2 = ctx.transformedPoint(canvas.width, canvas.height);
	ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
	
	// Alternatively:
	// ctx.save();
	// ctx.setTransform(1,0,0,1,0,0);
	// ctx.clearRect(0,0,canvas.width,canvas.height);
	// ctx.restore();
	drawContent(ctx);
}

function drawContent(ctx)
{
	for (var i = 0; i < _env.layers.length; i++)
	{
		var c_layer = _env.layers[i];
		for(var j = 0; j < c_layer.l_objs.length; j++)
		{
			var curr_o = _env.objects[c_layer.l_objs[j]];
			if (curr_o.drawType == 'lines')
			{
				drawLineObject(ctx, curr_o);
			}
			else if (curr_o.drawType == 'curve')
			{
				drawCurveObject(ctx, curr_o);
			}
		}
	}
}

function drawCurveObject(ctx, p)
{
	var curr = p.verts;
	
	ctx.beginPath();
	
	ctx.fillStyle = p.fillColor;
	ctx.lineWidth = p.lineWidth;
	
	// move to the first point
	ctx.moveTo(curr[0].x, curr[0].y);
	
	for (j = 1; j < curr.length - 2; j++)
	{
		var xc = (curr[j].x + curr[j + 1].x) / 2;
		var yc = (curr[j].y + curr[j + 1].y) / 2;
		ctx.quadraticCurveTo(curr[j].x, curr[j].y, xc, yc);
	}
	// curve through the last two points
	ctx.quadraticCurveTo(curr[j].x, curr[j].y, curr[j + 1].x, curr[j + 1].y);
	
	ctx.closePath();
	//fill based on settings
	if (p.fill) ctx.fill();
	
	ctx.stroke();
}

function drawLineObject(ctx, p)
{
	var curr = p.verts;
	
	ctx.beginPath();
	
	ctx.fillStyle = p.fillColor;
	ctx.lineWidth = p.lineWidth;
	
	// move to the first point
	ctx.moveTo(curr[0].x, curr[0].y);
	
	for (var j = 1; j < curr.length; j++)
	{
		ctx.lineTo(curr[j].x, curr[j].y);
	}
	
	ctx.closePath();
	//fill based on settings
	if (p.fill) ctx.fill();
	
	ctx.stroke();
}

// ---------------------------------
//		MARK: Misc.
// ---------------------------------
// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx)
{
	var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function()
	{
		return xform;
	};
	
	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function()
	{
		savedTransforms.push(xform.translate(0, 0));
		return save.call(ctx);
	};
	var restore = ctx.restore;
	ctx.restore = function()
	{
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};
	
	var scale = ctx.scale;
	ctx.scale = function(sx, sy)
	{
		xform = xform.scaleNonUniform(sx, sy);
		return scale.call(ctx, sx, sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function(radians)
	{
		xform = xform.rotate(radians * 180 / Math.PI);
		return rotate.call(ctx, radians);
	};
	var translate = ctx.translate;
	ctx.translate = function(dx, dy)
	{
		xform = xform.translate(dx, dy);
		return translate.call(ctx, dx, dy);
	};
	var transform = ctx.transform;
	ctx.transform = function(a, b, c, d, e, f)
	{
		var m2 = svg.createSVGMatrix();
		m2.a = a;
		m2.b = b;
		m2.c = c;
		m2.d = d;
		m2.e = e;
		m2.f = f;
		xform = xform.multiply(m2);
		return transform.call(ctx, a, b, c, d, e, f);
	};
	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a, b, c, d, e, f)
	{
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx, a, b, c, d, e, f);
	};
	var pt = svg.createSVGPoint();
	ctx.transformedPoint = function(x, y)
	{
		pt.x = x;
		pt.y = y;
		return pt.matrixTransform(xform.inverse());
	}
}