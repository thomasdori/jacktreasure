define('resourceloader', ['resourcetype'], function (ResourceType) {
    function ResourceLoader() {
        this.resources = [];
        this.resourcesLoaded = 0;
    }

    ResourceLoader.prototype.addImage = function (imgSrc) {
        var img = new Image();
        this.resources.push({
            type: ResourceType.IMAGE,
            file: img,
            src: imgSrc
        });

        return img;
    };

    ResourceLoader.prototype.addJSON = function (jsonSrc) {
        var jsonObject = {};
        this.resources.push({
            type: ResourceType.JSON,
            file: jsonObject,
            src: jsonSrc
        });

        return jsonObject;
    };

    ResourceLoader.prototype.addSound = function (soundSrc) {

    };

    ResourceLoader.prototype.load = function () {
        var self = this;
        self.resources.forEach(function (elem) {

            if (elem.type === ResourceType.IMAGE) {
                elem.file.onload = function () {
                    self.onResourceLoad();
                };
                elem.file.src = elem.src;

            } else if (elem.type === ResourceType.JSON) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", elem.src, true);

                xhr.onload = function () {
                    var json = JSON.parse(this.responseText);
                    for(var k in json)
                        elem.file[k] = json[k];
                    self.onResourceLoad();
                };

                xhr.send();
            }
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