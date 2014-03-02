tool.maxDistance = 50;

// every time the user drags their mouse
// this function will be executed
function onMouseDrag(event) {
    // Take the click/touch position as the centre of our circle
    var x = event.middlePoint.x;
    var y = event.middlePoint.y;
    // The faster the movement, the bigger the circle
    var radius = event.delta.length / 2;
    // Generate our random color
    var color = { red: 0, green: 0, blue: 0, alpha: 1 };
    // Draw the circle
    drawCircle( x, y, radius, color );
    // Pass the data for this circle
    // to a special function for later
    emitCircle( x, y, radius, color );
}

function drawCircle( x, y, radius, color ) {
    // Render the circle with Paper.js
    var circle = new Path.Circle( new Point( x, y ), radius );
    circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );
    // Refresh the view, so we always get an update, even if the tab is not in focus
    view.draw();
}

function emitCircle( x, y, radius, color ) {
    // Each Socket.IO connection has a unique session id
    var sessionId = io.socket.sessionid;

    // An object to describe the circle's draw data
    var data = {
        x: x,
        y: y,
        radius: radius,
        color: color
    };

    // send a 'drawCircle' event with data and sessionId to the server
    io.emit( 'drawCircle', data, sessionId )

    // Lets have a look at the data we're sending
    console.log( data )
}

io.on( 'drawCircle', function( data ) {
    drawCircle( data.x, data.y, data.radius, data.color );
});
