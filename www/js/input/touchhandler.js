define('input/touchhandler', function () {
    function TouchHandler(touchInterpreter, actionMapper, touchFactory) {
        this.touchInterpreter = touchInterpreter;
        this.actionMapper = actionMapper;
        this.touchFactory = touchFactory;
        this.onGoingTouches = {};
    }

    TouchHandler.prototype.handleTouchStart = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            this.onGoingTouches[touches[i].identifier] = [
                this.touchFactory.getInstance(touches[i].clientX, touches[i].clientY)
            ];
        }
    };

    TouchHandler.prototype.handleTouchMove = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var goinTouches = this.onGoingTouches[touches[i].identifier];

            if (goinTouches === undefined)
                return;

            goinTouches.push(this.touchFactory.getInstance(touches[i].clientX, touches[i].clientY));

            if (goinTouches.length == 4) {
                this.actionMapper[this.touchInterpreter.interpret(goinTouches)]();

                this._cleanUpTouches(goinTouches);

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
                goinTouches.push(this.touchFactory.getInstance(touches[i].clientX, touches[i].clientY));

                this.actionMapper[this.touchInterpreter.interpret(goinTouches)]();

                this._cleanUpTouches(goinTouches);

                break;
            }
        }
    };

    TouchHandler.prototype._cleanUpTouches = function (goinTouches) {
        var self = this;
        for (var prop in this.onGoingTouches) {
            goinTouches.forEach(function (elem) {
                self.touchFactory.releaseInstance(elem);
            });

            delete this.onGoingTouches[prop];
        }
    };

    return TouchHandler;
});