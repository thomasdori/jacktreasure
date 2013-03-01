define('render/dynamicobject', function () {
    function DynamicObject(id, sprites, tileX, tileY, currentSprite, currentSpriteId) {
        this.id = id;
        this.sprites = sprites;
        this.tileX = tileX;
        this.tileY = tileY;
        this.currentSprite = currentSprite;
        this.currentSpriteId = currentSpriteId;
        this.currentFrame = 0;
    }

    return DynamicObject;
});