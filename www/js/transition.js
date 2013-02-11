define('transition', function () {
    function Transition(startX, startY, targetX, targetY, animationId) {
        this.startX = startX;
        this.startY = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.animationId = animationId;
    }

    return Transition;
});