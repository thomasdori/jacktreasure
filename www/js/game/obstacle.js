define('game/obstacle', function () {
    function Obstacle(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    }

    return Obstacle;
});