require(['app', 'inputhandler', 'render/renderer', 'game', 'levelrepository', 'gameloop', 'resourceloader', 'camera', 'lib/Modernizr/modernizr', 'lib/domReady'],
    function (App, InputHandler, Renderer, Game, LevelRepository, GameLoop, ResourceLoader, Camera) {

        window.requestAnimFrame = (function () {
            return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var screen = document.getElementById('screen');
        var background = document.getElementById('background');

        var game = new Game();
        var inputHandler = new InputHandler(game);

        if (Modernizr.touch) {
            screen.addEventListener('touchstart', inputHandler.handleTouchStart, false);
            screen.addEventListener('touchmove', inputHandler.handleTouchMove, false);
            screen.addEventListener('touchend', inputHandler.handleTouchEnd, false);
        } else {
            //todo game-pad + keyboard
        }
        var Y_TILES = 18;
        var Y_OFF_SET = 3;

        var renderer = new Renderer(screen, background, document.createElement('canvas'), document.createElement('canvas'), window.innerWidth, window.innerHeight, Y_TILES);
        var gameLoop = new GameLoop(renderer, camera, game);
        var camera = new Camera(renderer, game, Y_OFF_SET);
        var levelRepo = new LevelRepository();
        var loader = new ResourceLoader();

        var app = new App(inputHandler, renderer, game, gameLoop, levelRepo, loader, camera);
        app.run();
    });
