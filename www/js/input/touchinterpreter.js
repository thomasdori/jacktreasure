define('input/touchinterpreter', ['input/gesture'], function (Gesture) {
    function TouchInterpreter() {
    }

    TouchInterpreter.prototype.interpret = function (touches) {
        var startPoint = touches[0];
        var vectors = [];
        for (var i = 1; i < touches.length; i++) {
            vectors.push({
                x: touches[i].x - startPoint.x,
                y: touches[i].y - startPoint.y
            });
            startPoint = touches[i];
        }

        var total = {x:0,y:0};
        vectors.forEach(function (vector) {
            total.x += vector.x;
            total.y += vector.y;
        });

        if (Math.abs(total.x) > Math.abs(total.y)) {
            // left or right
            if (total.x > 0)
                return Gesture.SWIPE_RIGHT;
            return Gesture.SWIPE_LEFT;
        } else {
            // up or down
            if (total.y > 0)
                return Gesture.SWIPE_DOWN;
            return Gesture.SWIPE_UP;
        }
    };

    return TouchInterpreter;
});