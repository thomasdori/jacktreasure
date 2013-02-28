define('render/staticobject', function () {
    function StaticObject(id, subImage, tileX, tileY) {
        this.id = id;
        this.subImage = subImage;
        this.tileX = tileX;
        this.tileY = tileY;
    }

    return StaticObject;
});