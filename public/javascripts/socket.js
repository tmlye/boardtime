var io = io.connect('/');

io.on('mouseDrag', function( data ) {
    console.log('received mouse drag event');
    tools[0].mouseDragHandler(data);
});

io.on('mouseDown', function( data ) {
    console.log('received mouse down event');
    tools[0].mouseDownHandler(data);
});

io.on('mouseUp', function( data ) {
    console.log('received mouse up event');
    tools[0].mouseUpHandler(data);
});
