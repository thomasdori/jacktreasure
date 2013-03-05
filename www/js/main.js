require(['app', 'input/touchhandler', 'render/renderer', 'game/game', 'levelrepository', 'gameloop', 'resourceloader',
    'render/camera', 'input/touchinterpreter', 'input/keyhandler', 'game/mapcontroller', 'game/collisiondetector',
    'lib/modernizr', 'lib/domReady'],
    function (App, TouchHandler, Renderer, Game, levelRepository, GameLoop, ResourceLoader, Camera, TouchInterpreter,
              KeyHandler, MapController, CollisionDetector) {

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
        var JACKS_ID = 0;

        var renderer = new Renderer(screen, background, window.innerWidth, window.innerHeight, Y_TILES);
        var collisionDetector = new CollisionDetector();
        var game = new Game(renderer, collisionDetector, JUMP_RANGE, SLIDE_RANGE, JACKS_ID);
        var mapCtr = new MapController();
        var camera = new Camera(renderer, mapCtr, JACKS_ID);
        var tickBus = [camera.tick.bind(camera), game.tick.bind(game)];
        var gameLoop = new GameLoop(renderer, tickBus, ANIMATION_SPEED, GAME_SPEED);
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

        } else if (Modernizr.gamepads) {
            //todo game-pad

        } else {
            var keyHandler = new KeyHandler(gameActionMapper);
            window.addEventListener('keydown', keyHandler.handleKeyDown.bind(keyHandler), false);
        }

        var app = new App(renderer, game, gameLoop, levelRepository, loader, camera, mapCtr, collisionDetector);
        app.run();
    });
