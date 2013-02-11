define('renderobject', function () {
    function RenderObject(id, type, animations, transitions, fixPosition, current) {
        this.id = id;
        this.type = type;
        this.animations = animations;
        this.transitions = transitions;
        this.fixPosition = fixPosition;
        this.current = current;
    }

    return RenderObject;
});