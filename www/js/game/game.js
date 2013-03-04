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

    };

    Game.prototype.jump = function () {

    };

    Game.prototype.slide = function () {

    };

    Game.prototype.do = function (action) {
        console.log(action);
    };

    return Game;
});