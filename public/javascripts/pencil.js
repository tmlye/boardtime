// Inheritance with functional pattern
var pencil = function(context) {
    var that = {};
    that.context = context;

    that.activate = function() {
        // brush settings
        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = '#000';
    };

    that.toolId = 0;

    that.mouseDragHandler = function(data) {
        path.add(data.point);
    };

    that.mouseDownHandler = function(data) {
        path = new Path();
        path.strokeColor = 'black';
        path.add(data.point);
        view.draw();
    };

    that.mouseUpHandler = function(data) {
    };

    // Move this to superclass
    // EVENTS
    that.onMouseDown = function onMouseDown(event) {
        that.mouseDownHandler(event);
        emitEvent('mouseDown', { toolId: 0, point: { x: event.point.x, y: event.point.y }});
    };

    that.onMouseDrag = function(event) {
        that.mouseDragHandler(event);
        emitEvent('mouseDrag', { toolId: 0, point: { x: event.point.x, y: event.point.y }});
    };

    that.onMouseUp = function(event) {
        that.mouseUpHandler(event);
        emitEvent('mouseDown', { toolId: 0, point: { x: event.point.x, y: event.point.y }});
    };

    return that;
};
