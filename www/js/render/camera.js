define('render/camera', ['render/staticobject', 'render/dynamicobject', 'render/animation', 'render/spritemapper'], function (StaticObject, DynamicObject, Animation, spriteMapper) {
    function Camera(renderer, game, offSet) {
        this.renderer = renderer;
        this.game = game;
        this.offSet = offSet;
        this.id = 0;
        this.sprite = {};
    }

    Camera.prototype.init = function (gridInfo) {
        this.renderer.setBackground({startX: 0, startY: 12, sprite: spriteMapper['path']});

        var grid = this.game.getLevelStart(gridInfo.yTiles + this.offSet);

        var self = this;
        grid.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                if (tile !== 0) {
                    self.renderer.addStatic(new StaticObject(self.id, spriteMapper[tile], x, y));
                    self.id++;
                }
            });
        });
        // jack treasure
        self.renderer.addDynamic(new DynamicObject(self.id, spriteMapper['jack'], 3, 10, spriteMapper['jack']['run'], 'run'));
        self.id++;
    };

    Camera.prototype.tick = function () {

    };

    return Camera;
});