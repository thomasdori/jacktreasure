define('render/animation', function () {
    function Animation(xPoint, yPoint, width, height, length, tileWidth, tileHeight) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
        this.length = length;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    return Animation;
});
