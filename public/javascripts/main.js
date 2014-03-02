// add paper to global scope
paper.install(window);

// global reference to all tools
var tools = [];

window.onload = function() {
    paper.setup('board');

    // Initialize tools
    tools[0] = pencil();

    // tool2 = new Tool();
    // tool2.minDistance = 20;
    // tool2.onMouseDown = onMouseDown;

    // tool2.onMouseDrag = function(event) {
        // Use the arcTo command to draw cloudy lines
        // path.arcTo(event.point);
    // }
}

function emitEvent(eventName, data) {
    // Each Socket.IO connection has a unique session id
    var sessionId = io.socket.sessionid;

    io.emit(eventName, data, sessionId)

    // Lets have a look at the data we're sending
    // console.log( data )
}
