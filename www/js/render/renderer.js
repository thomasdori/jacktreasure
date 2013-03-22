define('render/renderer', function () {

    function Renderer(screen, background, staticOsFactory, clientWidth, clientHeight, yTiles) {
        this.screen = screen;
        this.screenCtx = screen.getContext('2d');
        this.background = background;
        this.backgroundCtx = background.getContext('2d');
        this.staticOsFactory = staticOsFactory;
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
        this.atlas = {};
        this.yTiles = yTiles;
        this.xTiles = 0;
        this.tileWidth = 0;
        this.tileOffSet = 0;
        this.dynamicObjects = {};
        this.staticObjects = [];
        this.stepPxSum = 0;
        this.dirtyMap = [];
        this.ticker = 3;
        this.pxPerStep = 0;
    }

    Renderer.prototype.init = function (atlas) {
        this.atlas = atlas;

        this.tileWidth = Math.floor(this.clientHeight / 18);
        this.tileOffSet = - Math.floor(this.tileWidth * 0.5);
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

    Renderer.prototype.setTickRate = function (framesPerTick) {
        this.pxPerStep = Math.floor(this.tileWidth / framesPerTick);
    };

    Renderer.prototype.draw = function () {
        var self = this;
        self.staticObjects.forEach(function (elem) {
            var xPoint = self._getImgRenderXPoint(elem.tileX, elem.subImage) - self.stepPxSum;
            var xPointLast = xPoint + self.pxPerStep;
            var yPoint = self._getImgRenderYPoint(elem.tileY, elem.subImage);
            var width = self._getImgRenderWidth(elem.subImage);
            var height = self._getImgRenderHeight(elem.subImage);

            self.screenCtx.clearRect(xPointLast - 1, yPoint - 1, width + 2, height + 2);
            self.screenCtx.drawImage(self.atlas, elem.subImage.xPoint, elem.subImage.yPoint,
                elem.subImage.width, elem.subImage.height,
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

        this.stepPxSum += this.pxPerStep;
    };

    Renderer.prototype.tick = function () {
        var self = this;
        for (var i = this.staticObjects.length - 1; i >= 0; i--) {
            var elem = this.staticObjects[i];

            if (elem.tileX > 0) {
                elem.tileX--;

            } else {
                var yPoint = elem.tileY * self.tileWidth;
                var width = self._getImgRenderWidth(elem.subImage);
                var height = self._getImgRenderHeight(elem.subImage);

                self.screenCtx.clearRect(0, yPoint, width, height);
                self.staticObjects.splice(i, 1);
                self.staticOsFactory.releaseInstance(elem);
            }
        }
        self.ticker++;
        self.stepPxSum = 0;
    };

    Renderer.prototype.drawAnimation = function () {

        for (var key in this.dynamicObjects) {

            var elem = this.dynamicObjects[key];
            var anim = elem.currentSprite;
            elem.currentFrameId++;
            elem.currentFrame = elem.currentSprite[elem.currentFrameId];

            if (elem.currentFrameId >= anim.length) {
                elem.currentFrameId = 0;
                elem.currentFrame = elem.currentSprite[elem.currentFrameId];
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
            elem.currentFrame.xPoint,
            elem.currentFrame.yPoint,
            elem.currentFrame.width,
            elem.currentFrame.height,
            this._getImgRenderXPoint(elem.tileX ,elem.currentFrame),
            this._getImgRenderYPoint(elem.tileY, elem.currentFrame),
            this._getImgRenderWidth(elem.currentFrame),
            this._getImgRenderHeight(elem.currentFrame));
    };

    Renderer.prototype.setBackground = function (info) {
        for (var x = 0; x < this.xTiles; x++)
            this.backgroundCtx.drawImage(this.atlas, info.subImage.xPoint, info.subImage.yPoint,
                info.subImage.width, info.subImage.height,
                x * this.tileWidth, info.startY * this.tileWidth,
                this._getImgRenderWidth(info.subImage), this._getImgRenderHeight(info.subImage));
    };

    Renderer.prototype._getImgRenderXPoint = function (x, subImage) {
        return x * this.tileWidth + this.tileOffSet - subImage.offSetX;
    };

    Renderer.prototype._getImgRenderYPoint = function (y, subImage) {
        return y * this.tileWidth + this.tileOffSet - subImage.offSetY;
    };

    Renderer.prototype._getImgRenderWidth = function (subImage) {
        return subImage.tileWidth * this.tileWidth;
    };

    Renderer.prototype._getImgRenderHeight = function (subImage) {
        return subImage.tileHeight * this.tileWidth;
    };

    Renderer.prototype.addDynamic = function (elem) {
        this.dynamicObjects[elem.id] = elem;

        var spriteEndY = elem.tileY + elem.currentFrame.tileHeight;
        var spriteEndX = elem.tileX + elem.currentFrame.tileWidth;
        for (var y = elem.tileY; y < spriteEndY; y++)
            for (var x = elem.tileX; x < spriteEndX; x++)
                this.dirtyMap[y][x] = elem;

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