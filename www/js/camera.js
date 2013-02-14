define('camera', ['staticobject', 'dynamicobject', 'animation'], function (StaticObject, DynamicObject, Animation) {
    function Camera(renderer, game, offSet) {
        this.renderer = renderer;
        this.game = game;
        this.offSet = offSet;
    }

    Camera.prototype.init = function (gridInfo) {
        var grid = this.game.getLevelStart(gridInfo.yTiles + offSet);
        var self = this;
        grid.forEach(function (row, y) {
            row.forEach(function (tile, x) {
                if (tile === 'o') {
                    // self.renderer.addStatic(new StaticObject(id, imageSprite, initX, initY))
                    //todo hier gehts weiter:
                    // zum start
                    // - alle objects auf renderer hinzufuegen
                    // - jack adden
                    // - ... loop
                }
            })
        });
    };

    return Camera;
});