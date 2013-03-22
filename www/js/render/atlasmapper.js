define('render/atlasmapper', ['render/subimage'], function (SubImage) {
    function AtlasMapper(referenceWidth) {
        this.referenceWidth = referenceWidth;
        this.atlasDict = {};
    }

    AtlasMapper.prototype.init = function (atlasInfo) {
        var self = this;
        atlasInfo.frames.forEach(function (elem) {
            var offSetFromCenterX = elem.spriteSourceSize.x - Math.floor(elem.sourceSize.w * 0.5);
            var offSetFromCenterY = elem.spriteSourceSize.y - Math.floor(elem.sourceSize.h * 0.5);

            var subImage = new SubImage(elem.frame.x, elem.frame.y, elem.frame.w, elem.frame.h,
                offSetFromCenterX, offSetFromCenterY,
                Math.floor(elem.sourceSize.w / self.referenceWidth),
                Math.floor(elem.sourceSize.h / self.referenceWidth));

            if (elem.filename.search("-\\d+") != -1) {

                // it's a sprite
                var keyName = elem.filename.substring(0, elem.filename.lastIndexOf('-'));
                if (self.atlasDict[keyName] == undefined) {
                    self.atlasDict[keyName] = [subImage];
                } else {
                    //
                    self.atlasDict[keyName].push(subImage);
                }

            } else {
                // it's just a sub image
                self.atlasDict[elem.filename.substring(0, elem.filename.lastIndexOf('.'))] = subImage;
            }
        });
    };

    AtlasMapper.prototype.get = function (key) {
        return this.atlasDict[key];
    };

    return AtlasMapper;
});