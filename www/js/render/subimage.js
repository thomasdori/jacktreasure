define('render/subimage', function () {
    function SubImage(xPoint, yPoint, width, height, tileWidth, tileHeight) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    return SubImage;
});