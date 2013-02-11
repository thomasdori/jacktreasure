define('snapshot', function () {
    function Snapshot(animation, animationId, transition, transitionId, tile, maxTiles) {
        this.animation = animation;
        this.animationId = animationId;
        this.transition = transition;
        this.transitionId = transitionId;
        this.tile = tile;
        this.maxTiles = maxTiles;
    }

    return Snapshot;
});