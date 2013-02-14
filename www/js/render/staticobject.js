define('staticobject', function () {
    function StaticObject(id, imageSprite, initX, initY) {
        this.id = id;
        this.imageSprite = imageSprite;
        this.initX = initX;
        this.initY = initY;
    }

    return StaticObject;
});