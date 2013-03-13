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

        this.renderer.setBackground({startX: 0, startY: 12, subImage: atlasMapper['path']});
        this.map = map;

        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < gridInfo.xTiles; x++) {
                var elem = this.map[y][x];
                if (elem != 0 && elem != 'path') {
                    this.renderer.addStatic(new StaticObject(this.id, atlasMapper[elem], x, y));
                    this.id++;
                }
            }
        }

        this.nxtXCoord = gridInfo.xTiles;
        this.width = gridInfo.xTiles;

        // jack treasure
        this.renderer.addDynamic(new DynamicObject(this.jacksId, atlasMapper['jack'], 3, 10, atlasMapper['jack']['run'], 'run', false, null));
    };

    Camera.prototype.tick = function () {
        var xCoord = this.nxtXCoord -1;
        for (var y = 0; y < this.map.length; y++) {
            var elem = this.map[y][xCoord];
            if (elem != 0 && elem != 'path') {
                this.renderer.addStatic(new StaticObject(this.id, atlasMapper[elem], this.width - 1, y));
                this.id++;
            }
        }

        this.nxtXCoord++;
    };

    return Camera;
});