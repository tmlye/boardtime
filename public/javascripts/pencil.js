// Inheritance with functional pattern
var pencil = function() {
    var that = new Tool();
    var path;

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


    // EVENTS
    that.onMouseDown = function onMouseDown(event) {
        that.mouseDownHandler(event);
        emitEvent('mouseDown', { point: { x: event.point.x, y: event.point.y }});
    };

    that.onMouseDrag = function(event) {
        that.mouseDragHandler(event);
        emitEvent('mouseDrag', { point: { x: event.point.x, y: event.point.y }});
    };

    that.onMouseUp = function(event) {
        that.mouseUpHandler(event);
        emitEvent('mouseDown', { point: { x: event.point.x, y: event.point.y }});
    };

    return that;
};
