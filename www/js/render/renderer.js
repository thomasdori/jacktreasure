define('render/renderer', function () {

    function Renderer(screen, background, staticOsFactory, clientWidth, clientHeight, yTiles, gameSpeed) {
        this.screen = screen;
        this.screenCtx = screen.getContext('2d');
        this.background = background;
        this.backgroundCtx = background.getContext('2d');
        this.staticOsFactory = staticOsFactory;
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
        this.atlas = {};
        this.yTiles = yTiles;
        this.gameSpeed = gameSpeed;
        this.xTiles = 0;
        this.tileWidth = 0;
        this.dynamicObjects = {};
        this.staticObjects = [];
        this.lastTickRatio = 0;
        this.lastDraw = Date.now();
        this.lastStep = 0;
        this.stepPxSum = 0;
        this.dirtyMap = [];
        this.ticker = 3;
    }

    Renderer.prototype.init = function (atlas) {
        this.atlas = atlas;

        this.tileWidth = Math.floor(this.clientHeight / 18);
        this.xTiles = Math.floor(this.clientWidth / this.tileWidth);

        this.screen.width = this.clientWidth;
        this.screen.height = this.clientHeight;

        this.background.width = this.clientWidth;
        this.background.height = this.clientHeight;

        for (var y = 0; y < this.yTiles; y++) {
            this.dirtyMap.push([]);
            for (var x = 0; x < this.xTiles; x++)
                this.dirtyMap[y].push(null);
        }

        return {xTiles: this.xTiles, yTiles: this.yTiles};
    };

    Renderer.prototype.draw = function () {
        var now = Date.now();

        var drawDelta = now - this.lastDraw;
//        console.log(drawDelta);

        var stepRatio = Math.floor(this.gameSpeed / drawDelta);


        var self = this;
        self.staticObjects.forEach(function (elem) {
            var xPoint = (elem.tileX * self.tileWidth) - self.stepPxSum;
            var xPointLast = xPoint + self.lastStep;
            var yPoint = elem.tileY * self.tileWidth;
            var width = self.getImgRenderWidth(elem);
            var height = self.getImgRenderHeight(elem);

            self.screenCtx.clearRect(xPointLast, yPoint, width + 1, height + 1);
            self.screenCtx.drawImage(self.atlas, elem.subImage.xPoint, elem.subImage.yPoint, elem.subImage.width, elem.subImage.height,
                xPoint, yPoint, width, height);

            var dynamic = self.dirtyMap[elem.tileY][elem.tileX];
            if (dynamic != null) {
                self.renderDynamic(dynamic);
            } else {
                dynamic = self.dirtyMap[elem.tileY][elem.tileX + 1];
                if (dynamic != null) {
                    self.renderDynamic(dynamic);
                }
            }
        });
        var pxPerStep = Math.floor(this.tileWidth / stepRatio);
        this.stepPxSum += pxPerStep;
        console.log(pxPerStep);
//        console.log(this.stepPxSum);
        this.lastStep = pxPerStep;
        this.lastDraw = now;
    };

    Renderer.prototype.tick = function () {
        var self = this;
        for (var i = this.staticObjects.length - 1; i >= 0; i--) {
            var elem = this.staticObjects[i];

            if (elem.tileX > 0) {
                elem.tileX--;
                self.ticker++;
                self.stepPxSum = 0;

            } else {
                var yPoint = elem.tileY * self.tileWidth;
                var width = self.getImgRenderWidth(elem);
                var height = self.getImgRenderHeight(elem);

                self.screenCtx.clearRect(0, yPoint, width, height);
                self.staticObjects.splice(i, 1);
                self.staticOsFactory.releaseInstance(elem);
            }
        }
    };

    Renderer.prototype.drawOld = function (nxtTickRatio) {
//        console.log(nxtTickRatio);

        var self = this;
        for (var i = this.staticObjects.length - 1; i >= 0; i--) {
            var elem = this.staticObjects[i];
            var yPoint = elem.tileY * self.tileWidth;
            var width = self.getImgRenderWidth(elem);
            var height = self.getImgRenderHeight(elem);

            if (elem.tileX > 0) {

                var x, xLast;
                if (nxtTickRatio === 0) {
                    elem.tileX--;
                    self.ticker++;
                    x = elem.tileX * self.tileWidth;
                    xLast = x + self.tileWidth;

                } else {
                    x = (elem.tileX * self.tileWidth) - Math.floor(self.tileWidth * nxtTickRatio);
                    xLast = (x + self.tileWidth) - Math.floor(self.tileWidth * self.lastTickRatio);
                }

                self.screenCtx.clearRect(xLast, yPoint, width, height);
                self.screenCtx.drawImage(self.atlas, elem.subImage.xPoint, elem.subImage.yPoint, elem.subImage.width, elem.subImage.height,
                    x, yPoint, width, height);

                var dynamic = self.dirtyMap[elem.tileY][elem.tileX];
                if (dynamic != null) {
                    self.renderDynamic(dynamic);
                } else {
                    dynamic = self.dirtyMap[elem.tileY][elem.tileX + 1];
                    if (dynamic != null) {
                        self.renderDynamic(dynamic);
                    }
                }

            } else {
                self.screenCtx.clearRect(0, yPoint, width, height);
                self.staticObjects.splice(i, 1);
                self.staticOsFactory.releaseInstance(elem);
            }
        }

        this.lastTickRatio = nxtTickRatio;
    };

    Renderer.prototype.drawAnimation = function () {

        for (var key in this.dynamicObjects) {

            var elem = this.dynamicObjects[key];
            var anim = elem.currentSprite;
            elem.currentFrame++;

            if (elem.currentFrame >= anim.length) {
                elem.currentFrame = 0;
                if (elem.nxtSpriteSet) {
                    elem.currentSpriteId = elem.nxtSpriteId;
                    elem.currentSprite = elem.sprites[elem.nxtSpriteId];
                }
            }

            this.screenCtx.clearRect(elem.tileX * this.tileWidth, elem.tileY * this.tileWidth,
                anim.tileWidth * this.tileWidth, anim.tileWidth * this.tileWidth);

            this.renderDynamic(elem);
        }
    };

    Renderer.prototype.renderDynamic = function (elem) {
        this.screenCtx.drawImage(this.atlas,
            elem.currentSprite.xPoint + (elem.currentSprite.width * elem.currentFrame),
            elem.currentSprite.yPoint,
            elem.currentSprite.width,
            elem.currentSprite.height,
            elem.tileX * this.tileWidth,
            elem.tileY * this.tileWidth,
            elem.currentSprite.tileWidth * this.tileWidth,
            elem.currentSprite.tileHeight * this.tileWidth);
    };

    Renderer.prototype.setBackground = function (info) {
        for (var x = 0; x < this.xTiles; x++)
            this.backgroundCtx.drawImage(this.atlas, info.subImage.xPoint, info.subImage.yPoint, info.subImage.width, info.subImage.height,
                x * this.tileWidth, info.startY * this.tileWidth, this.getImgRenderWidth(info), this.getImgRenderHeight(info));
    };

    Renderer.prototype.getImgRenderWidth = function (elem) {
        return elem.subImage.tileWidth * this.tileWidth;
    };

    Renderer.prototype.getImgRenderHeight = function (elem) {
        return elem.subImage.tileHeight * this.tileWidth;
    };

    Renderer.prototype.addDynamic = function (elem) {
        this.dynamicObjects[elem.id] = elem;

        var spriteEndY = elem.tileY + elem.currentSprite.tileHeight;
        var spriteEndX = elem.tileX + elem.currentSprite.tileWidth;
        for (var y = elem.tileY; y < spriteEndY; y++)
            for (var x = elem.tileX; x < spriteEndX; x++)
                this.dirtyMap[y][x] = elem;

        //todo remove just for testing
        this.lastDraw = Date.now();
    };

    Renderer.prototype.queueNxtSprite = function (id, spriteId) {
        var o = this.dynamicObjects[id];
        o.nxtSpriteId = spriteId;
        o.nxtSpriteSet = true;
    };

    Renderer.prototype.addMovingDynamic = function (elem) {

    };

    Renderer.prototype.addStatic = function (elem) {
        this.staticObjects.push(elem);
    };

    Renderer.prototype.addAnimatedStatic = function (elem) {

    };

    Renderer.prototype.renderTestEndScreen = function () {
        this.backgroundCtx.clearRect(0, 0, this.background.width, this.background.height);

        this.screenCtx.fillStyle = '#6c6';
        this.screenCtx.clearRect(0, 0, this.screen.width, this.screen.height);
        this.screenCtx.fillRect(0, 0, this.screen.width, this.screen.height);

        this.screenCtx.fillStyle = '#000';
        this.screenCtx.font = 'bold 16px Arial, sans-serif';

        var txt = "GAME OVER :( u ran " + this.ticker + " meters";
        var txtSize = this.screenCtx.measureText(txt);
        var xCoord = this.screen.width / 2 - txtSize.width / 2;

        this.screenCtx.fillText(txt, xCoord, this.screen.height / 2)
    };

    return Renderer;
});