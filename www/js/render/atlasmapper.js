define('render/atlasmapper', ['render/subimage', 'render/sprite'], function (SubImage, Sprite) {
    return {
        rock: new SubImage(160, 0, 32, 32, 1, 1),
        path: new SubImage(128, 0, 32, 32, 1, 1),
        spears: new SubImage(192, 0, 64, 32, 2, 1),
        fire: new Sprite(128, 32, 32, 32, 4, 1, 1),
        jack: {
            run: new Sprite(0, 0, 32, 64, 4, 1, 2),
            jump_broad: new Sprite(0, 64, 64, 64, 4, 2, 2),
            jump: new Sprite(0, 128, 32, 64, 4, 1, 2),
            slide: new Sprite(0, 192, 32, 64, 4, 1, 2)
        },
        canyon: new SubImage(128, 128, 96, 96, 3, 3),
        large_obstacle: new SubImage(224, 128, 32, 64, 1, 2)
    }
});