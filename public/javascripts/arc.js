var arc = function() {
    var that = new Tool();
    var path;

    that.toolId = 1;

    that.minDistance = 25;

    that.mouseDragHandler = function(data) {
        path.arcTo(data.point);
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
        emitEvent('mouseDown', { toolId: 1, point: { x: event.point.x, y: event.point.y }});
    };

    that.onMouseDrag = function(event) {
        that.mouseDragHandler(event);
        emitEvent('mouseDrag', { toolId: 1, point: { x: event.point.x, y: event.point.y }});
    };

    that.onMouseUp = function(event) {
        that.mouseUpHandler(event);
        emitEvent('mouseDown', { toolId: 1, point: { x: event.point.x, y: event.point.y }});
    };

    return that;
};
