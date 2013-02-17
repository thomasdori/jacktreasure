define('gameloop', function () {
    function GameLoop(renderer, camera, game, animationSpeed, gameSpeed) {
        this.renderer = renderer;
        this.camera = camera;
        this.game = game;
        this.animationSpeed = animationSpeed;
        this.gameSpeed = gameSpeed;
    }

    GameLoop.prototype.run = function() {
        var lastUpdate = 0;
        var acDeltaAnim = 0;
        var acDeltaGame = 0;
        var nxtTickRatio = 0;
        var prevTickRatio = -1;
        var self = this;
        function loop() {
            window.requestAnimFrame(loop);

            var delta = Date.now() - lastUpdate;

            // animation stuff
            if (acDeltaAnim > self.animationSpeed) {
                acDeltaAnim = 0;

                self.renderer.drawAnimation();

            } else {
                acDeltaAnim += delta;
            }

            // moving, game stuff
            if (acDeltaGame > self.gameSpeed) {
                acDeltaGame = 0;

                self.game.tick();
                self.camera.tick();

                nxtTickRatio = 0;

            } else {
                acDeltaGame += delta;
                nxtTickRatio = Math.round(acDeltaGame/self.gameSpeed * 10) / 10;
            }

            if (prevTickRatio !== nxtTickRatio)
                self.renderer.draw(nxtTickRatio);

            prevTickRatio = nxtTickRatio;
            lastUpdate = Date.now();
        }

        loop();
    };

    return GameLoop;
});