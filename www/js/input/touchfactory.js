define('input/touchfactory', ['input/touch'], function (Touch) {
    function TouchFactory() {
        this.activeInstances = [];
        this.instancePool = [new Touch()];
    }

    TouchFactory.prototype.getInstance = function (x, y) {
        var touch = null;
        if (this.instancePool.length) {
            touch = this.instancePool.pop();
            touch.x = x;
            touch.y = y;
        } else {
            touch = new Touch(x, y);
        }
        this.activeInstances.push(touch);

        return touch;
    };

    TouchFactory.prototype.releaseInstance = function (instance) {
        var index = this.activeInstances.indexOf(instance);
        this.activeInstances.splice(index, 1);
        this.instancePool.push(instance);
    };

    return TouchFactory;
});