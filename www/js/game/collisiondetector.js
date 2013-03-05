define('game/collisiondetector', ['game/heroaction'], function (HeroAction) {
    function CollisionDetector() {
        this.map = [[]];
    }

    CollisionDetector.prototype.init = function (map) {
        this.map = map;
    };

    CollisionDetector.prototype.isCollision = function (hero) {
        return (this.map[hero.yCoord][hero.xCoord+1] !== 0 && hero.currentAction !== HeroAction.SLIDE)
            || (this.map[hero.yCoord+1][hero.xCoord+1] !==0 && hero.currentAction !== HeroAction.JUMP);
    };

    return CollisionDetector;
});