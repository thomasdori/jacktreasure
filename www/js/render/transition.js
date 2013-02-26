define('transition', function() {
    function Transition(startX, startY, targetX, targetY, spriteId) {
        this.startX = startX;
        this.startY = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.spriteId = spriteId;
    }

    return Transition;
});