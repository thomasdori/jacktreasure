define('render/staticobject', function () {
    function StaticObject(id, sprite, initX, initY) {
        this.id = id;
        this.sprite = sprite;
        this.initX = initX;
        this.initY = initY;
    }

    return StaticObject;
});