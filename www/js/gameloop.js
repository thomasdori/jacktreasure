define('gameloop', function () {
    function GameLoop(renderer, camera, game) {
        this.renderer = renderer;
        this.camera = camera;
        this.game = game;
    }

    return GameLoop;
});