define('render/dynamicobject', function () {
    function DynamicObject(id, sprites, initX, initY, currentSprite, currentSpriteId) {
        this.id = id;
        this.sprites = sprites;
        this.initX = initX;
        this.initY = initY;
        this.currentSprite = currentSprite;
        this.currentSpriteId = currentSpriteId;
        this.currentFrame = 0;
    }

    return DynamicObject;
});