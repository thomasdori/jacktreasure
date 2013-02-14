define('renderer', function () {

    function Renderer(screen, background, staticLayer, dynamicLayer, clientWidth, clientHeight, yTiles) {
        this.screen = screen;
        this.screenCtx = screen.getContext('2d');
        this.background = background;
        this.backgroundCtx = background.getContext('2d');
        this.staticLayer = staticLayer;
        this.staticLayerCtx = staticLayer.getContext('2d');
        this.dynamicLayer = dynamicLayer;
        this.dynamicLayerCtx = dynamicLayer.getContext('2d');
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
        this.sprite = {};
        this.yTiles = yTiles;
        this.xTiles = 0;
        this.tileWidth = 0;
    }

    Renderer.prototype.init = function (spriteSheet) {
        this.sprite = spriteSheet;

        this.screen.width = this.clientWidth;
        this.screen.height = this.clientHeight;

        this.background.width = this.clientWidth;
        this.background.height = this.clientHeight;

        this.staticLayer.width = this.clientWidth;
        this.staticLayer.height = this.clientHeight;

        this.dynamicLayer.width = this.clientWidth;
        this.dynamicLayer.height = this.clientHeight;

        this.tileWidth = Math.floor(this.clientHeight / 18);
        this.xTiles = Math.floor(this.clientWidth / this.tileWidth);

        return {xTiles:this.xTiles, yTiles:this.yTiles};
    };

    Renderer.prototype.addDynamic = function (elem) {

    };

    Renderer.prototype.addMovingDynamic = function (elem) {

    };

    Renderer.prototype.addStatic = function (elem) {

    };

    Renderer.prototype.addAnimatedStatic = function (elem) {

    };

    return Renderer;
});