define('dynamicobject', function () {
    function DynamicObject(id, animations, fixedPosition, currentAnimation, currentAnimationId) {
        this.id = id;
        this.animations = animations;
        this.fixedPosition = fixedPosition;
        this.currentAnimation = currentAnimation;
        this.currentAnimationId = currentAnimationId;
    }

    return DynamicObject;
});