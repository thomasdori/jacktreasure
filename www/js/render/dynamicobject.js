define('render/dynamicobject', function () {
    function DynamicObject(id, sprites, tileX, tileY, currentSprite, currentSpriteId, nxtSpriteSet, nxtSpriteId) {
        this.id = id;
        this.sprites = sprites;
        this.tileX = tileX;
        this.tileY = tileY;
        this.currentSprite = currentSprite;
        this.currentSpriteId = currentSpriteId;
        this.nxtSpriteSet = nxtSpriteSet;
        this.nxtSpriteId = nxtSpriteId;
        this.currentFrameId = 0;
        this.currentFrame = currentSprite[0];
    }

    return DynamicObject;
});