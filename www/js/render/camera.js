define('render/camera', ['render/staticobject', 'render/dynamicobject', 'render/sprite', 'render/atlasmapper',
    'render/transition'], function (StaticObject, DynamicObject, Sprite, atlasMapper, Transition) {
    function Camera(renderer, game, offSet) {
        this.renderer = renderer;
        this.game = game;
        this.offSet = offSet;
        this.id = 0;
        this.atlas = {};
    }

    Camera.prototype.init = function (gridInfo) {
        this.renderer.setBackground({startX: 0, startY: 12, subImage: atlasMapper['path']});

        var grid = this.game.getLevelStart(gridInfo.xTiles + this.offSet);

        var self = this;
        grid.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                if (tile !== 0) {
                    self.renderer.addStatic(new StaticObject(self.id, atlasMapper[tile], x, y, new Transition(x, y, 0, y), x, y, x + 1));
                    self.id++;
                }
            });
        });
        // jack treasure
        self.renderer.addDynamic(new DynamicObject(self.id, atlasMapper['jack'], 3, 10, atlasMapper['jack']['run'], 'run'));
        self.id++;
    };

    Camera.prototype.tick = function () {

    };

    return Camera;
});