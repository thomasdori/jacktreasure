define('app', function() {
    function App(inputHandler, renderer, game, gameLoop, levelRepository, resourceLoader, camera) {
        this.inputHandler = inputHandler;
        this.renderer = renderer;
        this.game = game;
        this.gameLoop = gameLoop;
        this.levelRespository = levelRepository;
        this.resourceLoader = resourceLoader;
        this.camera = camera;
    }

    App.prototype.run = function () {
        this.game.initLevel(this.levelRespository[0]);

        var sprite = this.resourceLoader.addImage('gfx/simple-sprite.png');

        var self = this;
        this.resourceLoader.onComplete = function () {
            var gridInfo = self.renderer.init(sprite);
            self.camera.init(gridInfo);
            self.gameLoop.run();
        };

        this.resourceLoader.load();
    };

    return App;
});
