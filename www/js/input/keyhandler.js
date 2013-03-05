define('input/keyhandler', ['input/key', 'input/gesture'], function (Key, Gesture) {
    function KeyHandler(actionMapper) {
        this.actionMapper = actionMapper;
    }

    KeyHandler.prototype.handleKeyDown = function (event) {
        if (event.keyCode === Key.UP) {
            this.actionMapper[Gesture.SWIPE_UP]();

        } else if (event.keyCode === Key.DOWN) {
            this.actionMapper[Gesture.SWIPE_DOWN]();

        } else if (event.keyCode === Key.RIGHT) {
            //todo

        } else if (event.keyCode === Key.LEFT) {
            //todo
        }
    };

    return KeyHandler;
});