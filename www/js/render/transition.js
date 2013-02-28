define('render/transition', function() {
    function Transition(startX, startY, targetX, targetY) {
        this.startX = startX;
        this.startY = startY;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    return Transition;
});