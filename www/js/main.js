require(['app', 'input/touchhandler', 'render/renderer', 'game/game', 'levelrepository', 'gameloop', 'resourceloader',
    'render/camera', 'input/touchinterpreter', 'input/keyhandler', 'lib/modernizr', 'lib/domReady'],
    function (App, TouchHandler, Renderer, Game, levelRepository, GameLoop, ResourceLoader, Camera, TouchInterpreter,
              KeyHandler) {

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

        var Y_TILES = 18;
        var ANIMATION_SPEED = 100; //ms
        var GAME_SPEED = 100; //ms
        var JUMP_RANGE = 10;
        var SLIDE_RANGE = 10;

        var renderer = new Renderer(screen, background, window.innerWidth, window.innerHeight, Y_TILES);

        var game = new Game(renderer, JUMP_RANGE, SLIDE_RANGE);

        var camera = new Camera(renderer, game);
        var gameLoop = new GameLoop(renderer, camera, game, ANIMATION_SPEED, GAME_SPEED);
        var loader = new ResourceLoader();

        var gameActionMapper = {
            up:game.jump.bind(game),
            down:game.slide.bind(game)
        };
        if (Modernizr.touch) {
            var touchInterpreter = new TouchInterpreter();
            var touchHandler = new TouchHandler(touchInterpreter, gameActionMapper);

            screen.addEventListener('touchstart', touchHandler.handleTouchStart.bind(touchHandler), false);
            screen.addEventListener('touchmove', touchHandler.handleTouchMove.bind(touchHandler), false);
            screen.addEventListener('touchend', touchHandler.handleTouchEnd.bind(touchHandler), false);

        } else {
            var keyHandler = new KeyHandler(gameActionMapper);
            window.addEventListener('keydown', keyHandler.handleKeyDown.bind(keyHandler), false);

            //todo game-pad
        }

        var app = new App(renderer, game, gameLoop, levelRepository, loader, camera);
        app.run();
    });
