define('render/staticobject', function () {
    function StaticObject(id, subImage, initX, initY) {
        this.id = id;
        this.subImage = subImage;
        this.initX = initX;
        this.initY = initY;
    }

    return StaticObject;
});