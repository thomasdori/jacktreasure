define('app', function() {
    function App(renderer, game, gameLoop, levelRepository, resourceLoader, camera, collisionDetector) {
        this.renderer = renderer;
        this.game = game;
        this.gameLoop = gameLoop;
        this.levelRespository = levelRepository;
        this.resourceLoader = resourceLoader;
        this.camera = camera;
        this.collisionDetector = collisionDetector;
    }

    App.prototype.run = function () {
        var map = this.levelRespository[0];
        this.collisionDetector.init(map);

        var heroPosition = {x:2,y:10}; // todo parse from map
        this.game.init(heroPosition.x, heroPosition.y);
        var atlas = this.resourceLoader.addImage('gfx/simple-atlas.png');

        var self = this;
        this.resourceLoader.onComplete = function () {
            var gridInfo = self.renderer.init(atlas);
            self.camera.init(map, gridInfo);
            self.gameLoop.run();
        };

        this.resourceLoader.load();
    };

    return App;
});
