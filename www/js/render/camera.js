define('render/camera', ['render/dynamicobject'], function (DynamicObject) {
    function Camera(renderer, staticOsFactory, atlasMapper, jacksId) {
        this.renderer = renderer;
        this.staticOsFactory = staticOsFactory;
        this.atlasMapper = atlasMapper;
        this.id = 10;
        this.atlas = {};
        this.nxtXCoord = -1;
        this.jacksId = jacksId;
        this.map = [
            []
        ];
    }

    Camera.prototype.init = function (map, gridInfo) {

        this.renderer.setBackground({startX: 0, startY: 12, subImage: this.atlasMapper.get('path')});
        this.map = map;

        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < gridInfo.xTiles; x++) {
                var elem = this.map[y][x];
                if (elem != 0 && elem != 'path') {
                    this.renderer.addStatic(
                        this.staticOsFactory.getInstance(this.id, this.atlasMapper.get(elem), x, y));
                    this.id++;
                }
            }
        }

        this.nxtXCoord = gridInfo.xTiles;
        this.width = gridInfo.xTiles;

        // jack treasure
        var sprites = {
            jump_broad: this.atlasMapper.get('jump_broad'),
            jump: this.atlasMapper.get('jump'),
            run: this.atlasMapper.get('run'),
            run_fast: this.atlasMapper.get('run_fast'),
            run_slow: this.atlasMapper.get('run_slow'),
            slide: this.atlasMapper.get('slide')
        };
        this.renderer.addDynamic(new DynamicObject(this.jacksId, sprites, 3, 10, this.atlasMapper.get('run'), 'run',
            false, null));
    };

    Camera.prototype.tick = function () {
        var xCoord = this.nxtXCoord - 1;
        for (var y = 0; y < this.map.length; y++) {
            var elem = this.map[y][xCoord];
            if (elem != 0 && elem != 'path') {
                this.renderer.addStatic(this.staticOsFactory.getInstance(this.id, this.atlasMapper.get(elem),
                    this.width - 1, y));
                this.id++;
            }
        }

        this.nxtXCoord++;
    };

    return Camera;
});