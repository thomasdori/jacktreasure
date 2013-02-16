define('render/renderer', function () {

    function Renderer(screen, background, staticLayer, dynamicLayer, clientWidth, clientHeight, yTiles, staticOffSet) {
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
        this.dynamicObjects = {};
        this.offSet = staticOffSet;
    }

    Renderer.prototype.init = function (spriteSheet) {
        this.sprite = spriteSheet;

        this.tileWidth = Math.floor(this.clientHeight / 18);
        this.xTiles = Math.floor(this.clientWidth / this.tileWidth);

        this.screen.width = this.clientWidth;
        this.screen.height = this.clientHeight;

        this.background.width = this.clientWidth;
        this.background.height = this.clientHeight;

        this.staticLayer.width = this.clientWidth + (this.offSet * this.tileWidth);
        this.staticLayer.height = this.clientHeight;

        this.dynamicLayer.width = this.clientWidth;
        this.dynamicLayer.height = this.clientHeight;

        return {xTiles:this.xTiles, yTiles:this.yTiles};
    };

    Renderer.prototype.draw = function (nxtTickRatio) {
        this.staticLayerCtx.drawImage(this.staticLayer, this.tileWidth, 0, this.staticLayer.width-this.tileWidth, this.staticLayer.height,
            0, 0, this.staticLayer-this.tileWidth, this.staticLayer.height);
        this.screenCtx.drawImage(this.staticLayer, 0, 0, this.staticLayer.width - (this.offSet * this.tileWidth), this.staticLayer.height,
            0, 0, this.screen.width, this.screen.height);
        this.screenCtx.drawImage(this.dynamicLayer, 0, 0, this.dynamicLayer.width, this.dynamicLayer.height, 0, 0, this.screen.width, this.screen.height);
    };

    Renderer.prototype.drawAnimation = function () {
        for (var key in this.dynamicObjects) {
            var elem = this.dynamicObjects[key];
            var anim = elem.currentAnimation;
            elem.currentFrame++;
            if (elem.currentFrame >= anim.length)
                elem.currentFrame = 0;

            this.dynamicLayerCtx.clearRect(elem.initX * this.tileWidth, elem.initY * this.tileWidth,
                anim.tileWidth * this.tileWidth, anim.tileWidth * this.tileWidth);

            this.dynamicLayerCtx.drawImage(this.sprite, anim.xPoint + (anim.width * elem.currentFrame), anim.yPoint, anim.width, anim.height,
                elem.initX * this.tileWidth, elem.initY * this.tileWidth, anim.tileWidth * this.tileWidth, anim.tileHeight * this.tileWidth)
        }
    };

    Renderer.prototype.setBackground = function (info) {
        for (var x = 0; x < this.xTiles; x++) {
            this.backgroundCtx.drawImage(this.sprite, info.sprite.xPoint, info.sprite.yPoint, info.sprite.width, info.sprite.height,
                x * this.tileWidth, info.startY * this.tileWidth, info.sprite.tileWidth * this.tileWidth, info.sprite.tileHeight * this.tileWidth);
        }
    };

    Renderer.prototype.addDynamic = function (elem) {
        this.dynamicObjects[elem.id] = elem;
        var anim = elem.currentAnimation;

        this.dynamicLayerCtx.drawImage(this.sprite, anim.xPoint, anim.yPoint, anim.width, anim.height,
            elem.initX * this.tileWidth, elem.initY * this.tileWidth, anim.tileWidth * this.tileWidth, anim.tileHeight * this.tileWidth);
    };

    Renderer.prototype.addMovingDynamic = function (elem) {

    };

    Renderer.prototype.addStatic = function (elem) {
        this.staticLayerCtx.drawImage(this.sprite, elem.sprite.xPoint, elem.sprite.yPoint, elem.sprite.width, elem.sprite.height,
            elem.initX * this.tileWidth, elem.initY * this.tileWidth, elem.sprite.tileWidth * this.tileWidth, elem.sprite.tileHeight * this.tileWidth);
    };

    Renderer.prototype.addAnimatedStatic = function (elem) {

    };

    return Renderer;
});