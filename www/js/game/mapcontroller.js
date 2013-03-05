define('game/mapcontroller', function () {
    function MapController() {
        this.map = [[]];
    }

    MapController.prototype.initLevel = function (grid) {
        this.map = grid;
    };

    MapController.prototype.getLevelStart = function (width) {
        var start = [];
        for (var y = 0; y < this.map.length; y++) {
            start.push([]);
            for (var x = 0; x < width; x++) {
                var elem = this.map[y][x];
                if (elem !== 'path')
                    start[y].push(elem);
            }
        }
        return start;
    };

    MapController.prototype.getMapSlice = function (xCoord) {
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

    return MapController;
});