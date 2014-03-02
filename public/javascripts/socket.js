var io = io.connect('/');

io.on('mouseDrag', function( data ) {
    console.log('received mouse drag event');
    tools[data.toolId].mouseDragHandler(data);
});

io.on('mouseDown', function( data ) {
    console.log('received mouse down event');
    tools[data.toolId].mouseDownHandler(data);
});

io.on('mouseUp', function( data ) {
    console.log('received mouse up event');
    tools[data.toolId].mouseUpHandler(data);
});
