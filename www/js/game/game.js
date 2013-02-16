define('game/game', ['game/heroaction', 'game/hero'], function (HeroAction, Hero) {
    function Game() {
        this.map = [
            []
        ];
        this.hero = {};
    }

    Game.prototype.initLevel = function (grid) {

        this.map = grid;
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

    Game.prototype.tick = function () {

    };

    Game.prototype.jump = function () {

    };

    Game.prototype.slide = function () {

    };

    return Game;
});