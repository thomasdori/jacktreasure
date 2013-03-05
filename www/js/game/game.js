define('game/game', ['game/heroaction', 'game/hero', 'game/collisiondetector'], function (HeroAction, Hero,
                                                                                          CollisionDetector) {
    function Game(renderer) {
        this.renderer = renderer;
        this.map = [
            []
        ];
        this.hero = {};
        this.collisionDetector = {};
        this.heroId = 0;
    }

    Game.prototype.initLevel = function (grid) {

        this.map = grid;
        this.collisionDetector = new CollisionDetector(this.map);
        this.hero = new Hero(3, 10, 1, 2, HeroAction.RUN, false, -1);
    };

    Game.prototype.getLevelStart = function (width) {
        var start = [];
        for (var y=0; y<this.map.length; y++) {
            start.push([]);
            for (var x=0; x<width; x++) {
                var elem = this.map[y][x];
                if (elem !== 'path')
                    start[y].push(elem);
            }
        }
        return start;
    };

    Game.prototype.getMapSlice = function (xCoord) {
        if (xCoord >= this.map[1].length)
            return [];

        var col = [];
        for (var y = 0; y < this.map.length; y++) {
            var elem = this.map[y][xCoord];
            if (elem !== 'path')
                col.push(elem);
        }

        return col;
    };

    Game.prototype.tick = function () {
        this.hero.xCoord++;
        var collision = this.collisionDetector.isCollision(this.hero);

//        if (collision) {
//            alert("game over");
//            return;
//        }

        if (this.hero.actionTimerSet) {
            this.hero.actionTimer--;
            if (this.hero.actionTimer < 1) {
                this.hero.currentAction = HeroAction.RUN;
                this.hero.actionTimerSet = false;
                this.hero.actionTimer = -1;
            }
        }
    };

    Game.prototype.jump = function () {
        this.hero.currentAction = HeroAction.JUMP;
        this.hero.actionTimerSet = true;
        this.hero.actionTimer = 4;
        this.renderer.queueNxtSprite(this.heroId, HeroAction.JUMP);
    };

    Game.prototype.slide = function () {
        this.hero.currentAction = HeroAction.SLIDE;
        this.hero.actionTimerSet = true;
        this.hero.actionTimer = 4;
        this.renderer.queueNxtSprite(this.heroId, HeroAction.SLIDE);
    };

    Game.prototype.setHeroId = function (id) {
        this.heroId = id;
    };

    return Game;
});