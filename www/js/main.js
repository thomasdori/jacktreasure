require(['app', 'input/inputhandler', 'render/renderer', 'game/game', 'levelrepository', 'gameloop', 'resourceloader', 'render/camera', 'input/touchinterpreter', 'lib/modernizr', 'lib/domReady'],
    function (App, InputHandler, Renderer, Game, levelRepository, GameLoop, ResourceLoader, Camera, TouchInterpreter) {

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
            up: game.jump.bind(game),
            down: game.slide.bind(game)
        };

        var touchInterpreter = new TouchInterpreter();
        var inputHandler = new InputHandler(game, touchInterpreter, gameActionMapper);

        if (Modernizr.touch) {
            screen.addEventListener('touchstart', inputHandler.handleTouchStart.bind(inputHandler), false);
            screen.addEventListener('touchmove', inputHandler.handleTouchMove.bind(inputHandler), false);
            screen.addEventListener('touchend', inputHandler.handleTouchEnd.bind(inputHandler), false);
        } else {
            //todo game-pad + keyboard
        }

        var app = new App(inputHandler, renderer, game, gameLoop, levelRepository, loader, camera);
        app.run();
    });
