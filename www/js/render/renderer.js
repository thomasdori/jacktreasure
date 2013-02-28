define('render/renderer', function () {

    function Renderer(screen, background, clientWidth, clientHeight, yTiles, staticOffSet) {
        this.screen = screen;
        this.screenCtx = screen.getContext('2d');
        this.background = background;
        this.backgroundCtx = background.getContext('2d');
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
        this.atlas = {};
        this.yTiles = yTiles;
        this.xTiles = 0;
        this.tileWidth = 0;
        this.dynamicObjects = {};
        this.staticObjects = [];
        this.offSet = staticOffSet;
        this.effectiveOffSet = 0;
        this.lastTickRatio = 0;
    }

    Renderer.prototype.init = function (atlas) {
        this.atlas = atlas;

        this.tileWidth = Math.floor(this.clientHeight / 18);
        this.xTiles = Math.floor(this.clientWidth / this.tileWidth);

        this.screen.width = this.clientWidth;
        this.screen.height = this.clientHeight;

        this.background.width = this.clientWidth;
        this.background.height = this.clientHeight;

        return {xTiles:this.xTiles, yTiles:this.yTiles};
    };

    Renderer.prototype.draw = function (nxtTickRatio) {
//        console.log(nxtTickRatio);

//        var self = this;
//        this.staticObjects.forEach(function (staticO) {
//            var x = Math.floor(staticO.tileX * self.tileWidth);
//            var y = Math.floor(staticO.tileY * self.tileWidth);
//
//            var clearX = x - Math.floor(self.lastTickRatio * self.tileWidth);
//            self.screenCtx.clearRect(clearX, y, staticO.subImage.tileWidth * self.tileWidth, staticO.subImage.tileHeight * self.tileWidth);
//
//            var drawX = x - Math.floor(nxtTickRatio * self.tileWidth);
//            self.screenCtx.drawImage(self.atlas, staticO.subImage.xPoint, staticO.subImage.yPoint, staticO.subImage.width, staticO.subImage.height,
//                x, y, staticO.subImage.tileWidth * self.tileWidth, staticO.subImage.tileHeight * self.tileWidth);
//
//        });
        if (nxtTickRatio === 0) {
            var self = this;
            this.staticObjects.forEach(function (elem, i) {
                if (elem.tileX > 0) {
                    var x = elem.tileX * self.tileWidth;
                    var y = elem.tileY * self.tileWidth;
                    var w = elem.subImage.tileWidth * self.tileWidth;
                    var h = elem.subImage.tileHeight * self.tileWidth;
                    self.screenCtx.clearRect(x, y, w, h);

                    self.screenCtx.drawImage(self.atlas, elem.subImage.xPoint, elem.subImage.yPoint, elem.subImage.width, elem.subImage.height,
                        elem.tileX * self.tileWidth, elem.tileY * self.tileWidth, elem.subImage.tileWidth * self.tileWidth, elem.subImage.tileHeight * self.tileWidth);


                    elem.tileX--;
                } else {
                    self.staticObjects.splice(i, 1);
                }

            });
        }

        this.lastTickRatio = nxtTickRatio;
    };

    Renderer.prototype.drawAnimation = function () {
        console.log("DRAW ANIMATION");
        for (var key in this.dynamicObjects) {
            var elem = this.dynamicObjects[key];
            var anim = elem.currentSprite;
            elem.currentFrame++;
            if (elem.currentFrame >= anim.length)
                elem.currentFrame = 0;

            this.screenCtx.clearRect(elem.tileX * this.tileWidth, elem.tileY * this.tileWidth,
                anim.tileWidth * this.tileWidth, anim.tileWidth * this.tileWidth);

            this.screenCtx.drawImage(this.atlas, anim.xPoint + (anim.width * elem.currentFrame), anim.yPoint, anim.width, anim.height,
                elem.tileX * this.tileWidth, elem.tileY * this.tileWidth, anim.tileWidth * this.tileWidth, anim.tileHeight * this.tileWidth)
        }
    };

    Renderer.prototype.setBackground = function (info) {
        for (var x = 0; x < this.xTiles; x++) {
            this.backgroundCtx.drawImage(this.atlas, info.subImage.xPoint, info.subImage.yPoint, info.subImage.width, info.subImage.height,
                x * this.tileWidth, info.startY * this.tileWidth, info.subImage.tileWidth * this.tileWidth, info.subImage.tileHeight * this.tileWidth);
        }
    };

    Renderer.prototype.addDynamic = function (elem) {
        this.dynamicObjects[elem.id] = elem;
        var sprite = elem.currentSprite;

        this.screenCtx.drawImage(this.atlas, sprite.xPoint, sprite.yPoint, sprite.width, sprite.height,
            elem.tileX * this.tileWidth, elem.tileY * this.tileWidth, sprite.tileWidth * this.tileWidth, sprite.tileHeight * this.tileWidth);
    };

    Renderer.prototype.addMovingDynamic = function (elem) {

    };

    Renderer.prototype.addStatic = function (elem) {
        this.staticObjects.push(elem);

//        this.screenCtx.drawImage(this.atlas, elem.subImage.xPoint, elem.subImage.yPoint, elem.subImage.width, elem.subImage.height,
//            elem.tileX * this.tileWidth, elem.tileY * this.tileWidth, elem.subImage.tileWidth * this.tileWidth, elem.subImage.tileHeight * this.tileWidth);
    };

    Renderer.prototype.addAnimatedStatic = function (elem) {

    };

    return Renderer;
});