define('gameloop', function () {
    function GameLoop(renderer, tickBus, animationSpeed, gameSpeed, frameSpeed) {
        this.renderer = renderer;
        this.tickBus = tickBus;
        this.animationSpeed = animationSpeed;
        this.gameSpeed = gameSpeed;
        this.frameSpeed = frameSpeed;
        window.stopRequestAnimFrame = false;
    }

    GameLoop.prototype.run = function() {
        var animRate = Math.round(this.animationSpeed / this.frameSpeed);
        var gameRate = Math.round(this.gameSpeed / this.frameSpeed);
        this.renderer.setTickRate(gameRate);

        var animTicker = 0;
        var gameTicker = 0;
        var self = this;
        function loop() {
            if (!window.stopRequestAnimFrame)
                window.requestAnimFrame(loop);

            if (animTicker >= animRate) {
                animTicker = 0;
                self.renderer.drawAnimation();

            } else {
                animTicker++;
            }

            if (gameTicker >= gameRate) {
                gameTicker = 0;
                self.tickBus.forEach(function (method) {
                    method();
                });

            } else {
                gameTicker++;
            }

            self.renderer.draw();
        }

        loop();
    };

    return GameLoop;
});