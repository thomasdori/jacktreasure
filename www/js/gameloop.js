define('gameloop', function () {
    function GameLoop(renderer, tickBus, animationSpeed, gameSpeed, transitionSpeed) {
        this.renderer = renderer;
        this.tickBus = tickBus;
        this.animationSpeed = animationSpeed;
        this.gameSpeed = gameSpeed;
        this.transitionSpeed = transitionSpeed;
        window.stopRequestAnimFrame = false;
    }

    GameLoop.prototype.run = function() {
        var lastUpdate = 0;
        var acDeltaAnim = 0;
        var acDeltaGame = 0;
        var acDeltaTrans = 0;
//        var transToGameRate = this.gameSpeed / this.transitionSpeed;
//        var nxtTickRatio = 0;
//        var prevTickRatio = -1;
        var self = this;
        function loop() {
            if (!window.stopRequestAnimFrame)
                window.requestAnimFrame(loop);

            var delta = Date.now() - lastUpdate;

            // animation stuff
            if (acDeltaAnim > self.animationSpeed) {
                acDeltaAnim = 0;

                self.renderer.drawAnimation();

            } else {
                acDeltaAnim += delta;
            }

            // moving, game stuff, everything registered to the tick bus
            if (acDeltaGame > self.gameSpeed) {
                acDeltaGame = 0;

                self.tickBus.forEach(function (method) {
                    method();
                });

//                nxtTickRatio = 0;

            } else {
                acDeltaGame += delta;
//                nxtTickRatio = Math.round(acDeltaGame/self.gameSpeed * 10) / 10;
//                if (nxtTickRatio >= 1)
//                    nxtTickRatio = 0;
//                if (prevTickRatio != nxtTickRatio)
//                    self.renderer.draw(nxtTickRatio);
            }

//            if (acDeltaTrans > self.transitionSpeed) {
//
//            } else {
//                acDeltaTrans += delta;
//            }

//            prevTickRatio = nxtTickRatio;

            self.renderer.draw();

            lastUpdate = Date.now();
        }

        loop();
    };

    return GameLoop;
});