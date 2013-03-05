define('input/touchhandler', function () {
    function TouchHandler(touchInterpreter, actionMapper) {
        this.touchInterpreter = touchInterpreter;
        this.actionMapper = actionMapper;
        this.onGoingTouches = {};
    }

    TouchHandler.prototype.handleTouchStart = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++)
            this.onGoingTouches[touches[i].identifier] = [touches[i]];
    };

    TouchHandler.prototype.handleTouchMove = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var goinTouches = this.onGoingTouches[touches[i].identifier];

            if (goinTouches === undefined)
                return;
            goinTouches.push(touches[i]);

            if (goinTouches.length == 4) {
                this.actionMapper[this.touchInterpreter.interpret(goinTouches)]();

                for (var prop in this.onGoingTouches)
                    delete this.onGoingTouches[prop];

                break;
            }
        }
    };

    TouchHandler.prototype.handleTouchEnd = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var goinTouches = this.onGoingTouches[touches[i].identifier];

            if (goinTouches !== undefined) {
                goinTouches.push(touches[i]);
                this.actionMapper[this.touchInterpreter.interpret(goinTouches)]();

                for (var prop in this.onGoingTouches)
                    delete this.onGoingTouches[prop];

                break;
            }
        }
    };

    return TouchHandler;
});