define('animation', function () {
    function Animation(xPoint, yPoint, width, height, length) {
        this.xPoint = xPoint;
        this.yPoint = yPoint;
        this.width = width;
        this.height = height;
        this.length = length;
    }

    return Animation;
});