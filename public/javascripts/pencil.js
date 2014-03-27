// Inheritance with functional pattern
var pencil = function() {
    var that = {};

    that.activate = function() {
        // brush settings
        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = '#000';
    };

    that.toolId = 0;

    that.mouseDragHandler = function(e) {
        var mouse = {
            x: e.pageX,
            y: e.pageY
        };
        that.draw(lastMouse, mouse, context.strokeStyle, context.lineWidth, context.globalCompositeOperation, true);
        lastMouse = mouse;
    };

    that.mouseDownHandler = function(e) {
    };

    that.mouseUpHandler = function(e) {
    };

    that.draw = function draw(start, end, color, size, compositeOperation, save) {
      context.save();
      context.lineJoin = 'round';
      context.lineCap = 'round';
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

    return that;
};
