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

    // Uses temporary canvas to set the cursor
    that.setCursor = function() {
        var cursorSize = context.lineWidth;
        if (cursorSize < 10) {
            cursorSize = 10;
        }

        var cursorColor = context.strokeStyle;
        var cursorGenerator = document.createElement('canvas');
        cursorGenerator.width = cursorSize;
        cursorGenerator.height = cursorSize;
        var ctx = cursorGenerator.getContext('2d');

        var centerX = cursorGenerator.width / 2;
        var centerY = cursorGenerator.height / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, (cursorSize / 2) - 4, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = cursorColor;
        ctx.stroke();
        $('#board').css('cursor', 'url(' + cursorGenerator.toDataURL('image/png') + ')'
                                         + cursorSize / 2 + ' ' + cursorSize / 2 + ',crosshair');
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
