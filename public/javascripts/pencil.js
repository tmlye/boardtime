// Inheritance with functional pattern
var pencil = function(context) {
    var that = {};
    that.context = context;

    that.lastMouse = {
        x: 0,
        y: 0
    };

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
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop
      };
      // Translates the coordinates from the local canvas size to 1140x400:
      sendMouse = {
        x: (1140/canvas.width)*mouse.x,
        y: (400/canvas.height)*mouse.y
      };
      sendLastMouse = {
        x: (1140/canvas.width)*lastMouse.x,
        y: (400/canvas.height)*lastMouse.y
      };
      draw(lastMouse, mouse, context.strokeStyle, context.lineWidth, context.globalCompositeOperation, true);
      lastMouse = mouse;
    };

    that.mouseDownHandler = function(e) {
      lastMouse = {
        x: e.pageX - this.offsetLeft,
        y: e.pageY - this.offsetTop
      };
    };

    that.mouseUpHandler = function(e) {
    };

    that.draw = function draw(start, end, color, size, compositeOperation, save) {
      context.save();
      context.lineJoin = 'round';
      context.lineCap = 'round';
      // Since the coordinates have been translated to an 1140x400 canvas, the context needs to be scaled before it can be drawn on:
      // context.scale(canvas.width/1140,canvas.height/400);
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
