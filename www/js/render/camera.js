define('render/camera', ['render/staticobject', 'render/dynamicobject', 'render/sprite', 'render/atlasmapper'], function (StaticObject, DynamicObject, Sprite, atlasMapper) {
    function Camera(renderer, mapCtrlr, jacksId) {
        this.renderer = renderer;
        this.mapCtrlr = mapCtrlr;
        this.id = 10;
        this.atlas = {};
        this.nxtXCoord = -1;
        this.jacksId = jacksId;
    }

    Camera.prototype.init = function (gridInfo) {
        this.renderer.setBackground({startX: 0, startY: 12, subImage: atlasMapper['path']});

        var grid = this.mapCtrlr.getLevelStart(gridInfo.xTiles);
        this.nxtXCoord = gridInfo.xTiles;
        this.width = gridInfo.xTiles;

        var self = this;
        grid.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                if (tile !== 0) {
                    self.renderer.addStatic(new StaticObject(self.id, atlasMapper[tile], x, y));
                    self.id++;
                }
            });
        });
        // jack treasure
        self.renderer.addDynamic(new DynamicObject(self.jacksId, atlasMapper['jack'], 3, 10, atlasMapper['jack']['run'], 'run', false, null));
    };

    Camera.prototype.tick = function () {
        var self = this;
        this.mapCtrlr.getMapSlice(this.nxtXCoord-1).forEach(function (elem, y) {
            if (elem !== 0) {
                self.renderer.addStatic(new StaticObject(self.id, atlasMapper[elem], self.width-1, y));
            }
        });
        this.nxtXCoord++;
    };

    return Camera;
});