define('input/touchhandler', ['input/touch'], function (Touch) {
    function TouchHandler(touchInterpreter, actionMapper) {
        this.touchInterpreter = touchInterpreter;
        this.actionMapper = actionMapper;
        this.onGoingTouches = {};
    }

    TouchHandler.prototype.handleTouchStart = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++)
            this.onGoingTouches[touches[i].identifier] = [new Touch(touches[i].clientX, touches[i].clientY)];
    };

    TouchHandler.prototype.handleTouchMove = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var goinTouches = this.onGoingTouches[touches[i].identifier];

            if (goinTouches === undefined)
                return;
            goinTouches.push(new Touch(touches[i].clientX, touches[i].clientY));

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
                goinTouches.push(new Touch(touches[i].clientX, touches[i].clientY));
                this.actionMapper[this.touchInterpreter.interpret(goinTouches)]();

                for (var prop in this.onGoingTouches)
                    delete this.onGoingTouches[prop];

                break;
            }
        }
    };

    return TouchHandler;
});