define('game/hero', function () {
    function Hero(xCoord, yCoord, width, height, currentAction, actionTimerSet, actionTimer) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;
        this.currentAction = currentAction;
        this.actionTimerSet = actionTimerSet;
        this.actionTimer = actionTimer;
    }

    return Hero;
});