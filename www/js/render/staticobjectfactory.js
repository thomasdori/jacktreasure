define('render/staticobjectfactory', ['render/staticobject'], function (StaticObject) {
    function StaticObjectFactory() {
        this.activeInstances = [];
        this.instancePool = [new StaticObject];
    }

    StaticObjectFactory.prototype.getInstance = function (id, subImage, tileX, tileY) {
        var staticObject = null;
        if (this.instancePool.length) {
            staticObject = this.instancePool.pop();
            staticObject.id = id;
            staticObject.subImage = subImage;
            staticObject.tileX = tileX;
            staticObject.tileY = tileY;
        } else {
            staticObject = new StaticObject(id, subImage, tileX, tileY);
        }
        this.activeInstances.push(staticObject);

        return staticObject;
    };

    StaticObjectFactory.prototype.releaseInstance = function (instance) {
        var index = this.activeInstances.indexOf(instance);
        this.activeInstances.splice(index, 1);
        this.instancePool.push(instance);
    };

    return StaticObjectFactory;
});