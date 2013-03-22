define('render/subimage', function () {
    function SubImage(xPoint, yPoint, width, height, offSetX, offSetY, tileWidth, tileHeight) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
        this.offSetX = offSetX;
        this.offSetY = offSetY;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    return SubImage;
});