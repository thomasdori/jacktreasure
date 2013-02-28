define('resourceloader', function () {
    function ResourceLoader() {
        this.resources = [];
        this.resourcesLoaded = 0;
    }

    ResourceLoader.prototype.addImage = function (imgSrc) {
        var img = new Image();
        this.resources.push({
            file:img,
            src:imgSrc
        });

        return img;
    };

    ResourceLoader.prototype.addSound = function (soundSrc) {

    };

    ResourceLoader.prototype.load = function () {
        var self = this;
        self.resources.forEach(function (elem) {
            elem.file.onload = function () {
                self.onResourceLoad();
            };
            elem.file.src = elem.src;
        });
    };

    ResourceLoader.prototype.onResourceLoad = function () {
        this.resourcesLoaded++;
        var onProgress = this.onProgress;
        if (onProgress !== undefined && typeof onProgress === "function")
            onProgress();

        if (this.resourcesLoaded === this.resources.length) {
            var onComplete = this.onComplete;
            if (onComplete !== undefined && typeof onComplete === "function")
                onComplete();
        }
    };

    ResourceLoader.prototype.isComplete = function () {
        return this.resources.length === this.resourcesLoaded;
    };

    return ResourceLoader;
});