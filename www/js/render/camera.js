define('render/camera', ['render/staticobject', 'render/dynamicobject', 'render/sprite', 'render/atlasmapper'], function (StaticObject, DynamicObject, Sprite, atlasMapper) {
    function Camera(renderer, jacksId) {
        this.renderer = renderer;
        this.id = 10;
        this.atlas = {};
        this.nxtXCoord = -1;
        this.jacksId = jacksId;
        this.map = [
            []
        ];
    }

    Camera.prototype.init = function (map, gridInfo) {
        var self = this;
        var getLevelStart = function (width) {
            for (var y = 0; y < self.map.length; y++) {
                for (var x = 0; x < width; x++) {
                    var elem = self.map[y][x];
                    if (elem != 0 && elem != 'path') {
                        self.renderer.addStatic(new StaticObject(self.id, atlasMapper[elem], x, y));
                        self.id++;
                    }
                }
            }
        };
        this.renderer.setBackground({startX: 0, startY: 12, subImage: atlasMapper['path']});
        this.map = map;
        getLevelStart(gridInfo.xTiles);
        this.nxtXCoord = gridInfo.xTiles;
        this.width = gridInfo.xTiles;

        // jack treasure
        self.renderer.addDynamic(new DynamicObject(self.jacksId, atlasMapper['jack'], 3, 10, atlasMapper['jack']['run'], 'run', false, null));
    };

    Camera.prototype.tick = function () {
        var self = this;
        var addNewElements = function (xCoord) {
            for (var y = 0; y < self.map.length; y++) {
                var elem = self.map[y][xCoord];
                if (elem != 0 && elem != 'path') {
                    self.renderer.addStatic(new StaticObject(self.id, atlasMapper[elem], self.width - 1, y));
                    self.id++;
                }
            }
        };

        addNewElements(this.nxtXCoord - 1);

        this.nxtXCoord++;
    };

    return Camera;
});