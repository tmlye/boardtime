var canvas = document.getElementById('board');
var context = canvas.getContext('2d');

var lastMouse = {
    x: 0,
    y: 0
};

// attach the mousedown, mouseout, mousemove, mouseup event listeners.
canvas.addEventListener('mousedown', function (e) {
  lastMouse = {
    x: e.pageX,
    y: e.pageY
  };
  activeTool.mouseDownHandler(e);
  // emitEvent('mouseDown', {});
  canvas.addEventListener('mousemove', onMouseMove, false);
}, false);

canvas.addEventListener('mouseout', function () {
  canvas.removeEventListener('mousemove', onMouseMove, false);
}, false);

canvas.addEventListener('mouseup', function () {
  canvas.removeEventListener('mousemove', onMouseMove, false);
}, false);

function onMouseMove(e) {
    emitEvent('mouseDrag', {toolId: activeTool.toolId, point: { x: e.pageX, y: e.pageY }, lastPoint: { x: lastMouse.x, y: lastMouse.y }, color: context.strokeStyle, line: context.lineWidth, globalCompositeOperation: context.globalCompositeOperation});
    activeTool.mouseDragHandler(e);
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

    activateTool(0);
}

function activateTool(id) {
    tools[0].activate();
    activeTool = tools[0];
    tools[0].setCursor();
}

function emitEvent(eventName, data) {
    // Each Socket.IO connection has a unique session id
    var sessionId = io.socket.sessionid;

    io.emit(eventName, data, sessionId)

    // Lets have a look at the data we're sending
    // console.log( data )
}
