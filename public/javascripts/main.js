var canvas = document.getElementById('board');
var context = canvas.getContext('2d');

var lastMouse = {
    x: 0,
    y: 0
};

// attach the mousedown, mouseout, mousemove, mouseup event listeners.
canvas.addEventListener('mousedown', function (e) {
  lastMouse = {
    x: e.pageX - this.offsetLeft,
    y: e.pageY - this.offsetTop
  };
  canvas.addEventListener('mousemove', move, false);
}, false);

canvas.addEventListener('mouseout', function () {
  canvas.removeEventListener('mousemove', move, false);
}, false);

canvas.addEventListener('mouseup', function () {
  canvas.removeEventListener('mousemove', move, false);
}, false);

// Draws the lines, called by move and the TogetherJS event listener:
function draw(start, end, color, size, compositeOperation, save) {
  context.save();
  context.lineJoin = 'round';
  context.lineCap = 'round';
  // Since the coordinates have been translated to an 1140x400 canvas, the context needs to be scaled before it can be drawn on:
  // context.scale(canvas.width/1140,canvas.height/400);
  context.strokeStyle = color;
  context.globalCompositeOperation = compositeOperation;
  context.lineWidth = size;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.closePath();
  context.stroke();
  context.restore();
  if (save) {
    // Won't save if draw() is called from reDraw().
    // lines.push([{x: start.x, y: start.y}, {x: end.x, y: end.y}, color, size, compositeOperation]);
  }
}

// Called whenever the mousemove event is fired, calls the draw function:
function move(e) {
  var mouse = {
    x: e.pageX - this.offsetLeft,
    y: e.pageY - this.offsetTop
  };
  // Translates the coordinates from the local canvas size to 1140x400:
  sendMouse = {
    x: (1140/canvas.width)*mouse.x,
    y: (400/canvas.height)*mouse.y
  };
  sendLastMouse = {
    x: (1140/canvas.width)*lastMouse.x,
    y: (400/canvas.height)*lastMouse.y
  };
  draw(lastMouse, mouse, context.strokeStyle, context.lineWidth, context.globalCompositeOperation, true);
  emitEvent('mouseDrag', {toolId: activeTool.toolId, point: { x: mouse.x, y: mouse.y }, lastPoint: { x: lastMouse.x, y: lastMouse.y }, color: context.strokeStyle, line: context.lineWidth, globalCompositeOperation: context.globalCompositeOperation});
  lastMouse = mouse;
}

// global reference to all tools
var tools = [];
var activeTool;

window.onload = function() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    // Initialize tools
    tools[0] = pencil(context);
    // tools[1] = arc();

    tools[0].activate();
    activeTool = tools[0];
}

function emitEvent(eventName, data) {
    // Each Socket.IO connection has a unique session id
    var sessionId = io.socket.sessionid;

    io.emit(eventName, data, sessionId)

    // Lets have a look at the data we're sending
    // console.log( data )
}
