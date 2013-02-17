require(['app', 'inputhandler', 'render/renderer', 'game/game', 'levelrepository', 'gameloop', 'resourceloader', 'render/camera', 'lib/Modernizr/modernizr', 'lib/domReady'],
    function (App, InputHandler, Renderer, Game, levelRepository, GameLoop, ResourceLoader, Camera) {

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
        var ANIMATION_SPEED = 100; //ms
        var GAME_SPEED = 500; //ms

//        var debugStatic = document.getElementById('debugStatic');
//        var debugDynamic = document.getElementById('debugDynamic');
        var renderer = new Renderer(screen, background, document.createElement('canvas'), document.createElement('canvas'),
            document.createElement('canvas'), window.innerWidth, window.innerHeight, Y_TILES, Y_OFF_SET);
//        var renderer = new Renderer(screen, background, debugStatic, debugDynamic, window.innerWidth, window.innerHeight, Y_TILES, Y_OFF_SET);
        var camera = new Camera(renderer, game, Y_OFF_SET);
        var gameLoop = new GameLoop(renderer, camera, game, 100, 500);
        var loader = new ResourceLoader();

        var app = new App(inputHandler, renderer, game, gameLoop, levelRepository, loader, camera);
        app.run();
    });
