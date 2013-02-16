define('render/dynamicobject', function () {
    function DynamicObject(id, animations, initX, initY, currentAnimation, currentAnimationId) {
        this.id = id;
        this.animations = animations;
        this.initX = initX;
        this.initY = initY;
        this.currentAnimation = currentAnimation;
        this.currentAnimationId = currentAnimationId;
        this.currentFrame = 0;
    }

    return DynamicObject;
});