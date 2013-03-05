define('input/inputhandler', function () {
    function InputHandler(game, touchInterpreter, actionMapper) {
        this.game = game;
        this.touchInterpreter = touchInterpreter;
        this.actionMapper = actionMapper;
        this.onGoingTouches = {};
    }

    InputHandler.prototype.handleTouchStart = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++)
            this.onGoingTouches[touches[i].identifier] = [touches[i]];
    };

    InputHandler.prototype.handleTouchMove = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var goinTouches = this.onGoingTouches[touches[i].identifier];

            if (goinTouches === undefined)
                return;
            goinTouches.push(touches[i]);

            if (goinTouches.length == 4) {
                var action = this.touchInterpreter.interpret(goinTouches);
                this.actionMapper[action]();

                for (var prop in this.onGoingTouches)
                    delete this.onGoingTouches[prop];

                break;
            }
        }
    };

    InputHandler.prototype.handleTouchEnd = function (event) {
        event.preventDefault();

        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var goinTouches = this.onGoingTouches[touches[i].identifier];

            if (goinTouches !== undefined) {
                goinTouches.push(touches[i]);
                var action = this.touchInterpreter.interpret(goinTouches);
                this.actionMapper[action]();

                for (var prop in this.onGoingTouches)
                    delete this.onGoingTouches[prop];

                break;
            }
        }
    };

    return InputHandler;
});