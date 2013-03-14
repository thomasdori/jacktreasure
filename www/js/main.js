require(['app', 'input/touchhandler', 'render/renderer', 'game/game', 'levelrepository', 'gameloop', 'resourceloader',
    'render/camera', 'input/touchinterpreter', 'input/keyhandler', 'game/collisiondetector', 'input/touchfactory',
    'render/staticobjectfactory', 'lib/modernizr', 'lib/domReady'],
    function (App, TouchHandler, Renderer, Game, levelRepository, GameLoop, ResourceLoader, Camera, TouchInterpreter,
              KeyHandler, CollisionDetector, TouchFactory, StaticObjectFactory) {

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
        var ANIMATION_SPEED = 25; //ms
        var GAME_SPEED = 50; //ms
        var JUMP_RANGE = 5;
        var SLIDE_RANGE = 5;
        var JACKS_ID = 0;

        var staticOsFactory = new StaticObjectFactory();
        var renderer = new Renderer(screen, background, staticOsFactory, window.innerWidth, window.innerHeight, Y_TILES);
        var collisionDetector = new CollisionDetector();
        var game = new Game(renderer, collisionDetector, JUMP_RANGE, SLIDE_RANGE, JACKS_ID);
        var camera = new Camera(renderer, staticOsFactory, JACKS_ID);
        var tickBus = [camera.tick.bind(camera), game.tick.bind(game)];
        var gameLoop = new GameLoop(renderer, tickBus, ANIMATION_SPEED, GAME_SPEED);
        var loader = new ResourceLoader();

        var gameActionMapper = {
            up:game.jump.bind(game),
            down:game.slide.bind(game)
        };
        if (Modernizr.touch) {
            var touchInterpreter = new TouchInterpreter();
            var touchHandler = new TouchHandler(touchInterpreter, gameActionMapper, new TouchFactory());

            screen.addEventListener('touchstart', touchHandler.handleTouchStart.bind(touchHandler), false);
            screen.addEventListener('touchmove', touchHandler.handleTouchMove.bind(touchHandler), false);
            screen.addEventListener('touchend', touchHandler.handleTouchEnd.bind(touchHandler), false);

        } else if (Modernizr.gamepads) {
            //todo game-pad

        } else {
            var keyHandler = new KeyHandler(gameActionMapper);
            window.addEventListener('keydown', keyHandler.handleKeyDown.bind(keyHandler), false);
        }

        var app = new App(renderer, game, gameLoop, levelRepository, loader, camera, collisionDetector);
        app.run();
    });
