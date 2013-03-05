define('game/game', ['game/heroaction', 'game/hero'], function (HeroAction, Hero) {
    function Game(renderer, collisionDetector, jumpRange, slideRange, heroId) {
        this.renderer = renderer;
        this.jumpRange = jumpRange;
        this.slideRange = slideRange;
        this.hero = {};
        this.collisionDetector = collisionDetector;
        this.heroId = heroId;
    }

    Game.prototype.init = function (heroX, heroY) {
        this.hero = new Hero(heroX, heroY, 1, 2, HeroAction.RUN, false, -1);
    };

    Game.prototype.tick = function () {
        this.hero.xCoord++;
        var collision = this.collisionDetector.isCollision(this.hero);

        if (collision) {
            console.log('COLLISION');
            window.stopRequestAnimFrame = true;
            this.renderer.renderTestEndScreen();

            return;
        }

        if (this.hero.actionTimerSet) {
            this.hero.actionTimer--;
            if (this.hero.actionTimer < 1) {
                this.hero.currentAction = HeroAction.RUN;
                this.hero.actionTimerSet = false;
                this.hero.actionTimer = -1;
                this.renderer.queueNxtSprite(this.heroId, HeroAction.RUN);
            }
        }
    };

    Game.prototype.jump = function () {
        this.hero.currentAction = HeroAction.JUMP;
        this.hero.actionTimerSet = true;
        this.hero.actionTimer = this.jumpRange;
        this.renderer.queueNxtSprite(this.heroId, HeroAction.JUMP);
    };

    Game.prototype.slide = function () {
        this.hero.currentAction = HeroAction.SLIDE;
        this.hero.actionTimerSet = true;
        this.hero.actionTimer = this.slideRange;
        this.renderer.queueNxtSprite(this.heroId, HeroAction.SLIDE);
    };

    return Game;
});