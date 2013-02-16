define('render/spritemapper', ['render/sprite', 'render/animation'], function (Sprite, Animation) {
    return {
        rock: new Sprite(160, 0, 32, 32, 1, 1),
        path: new Sprite(128, 0, 32, 32, 1, 1),
        spears: new Sprite(192, 0, 64, 32, 2, 1),
        fire: new Animation(128, 32, 32, 32, 4, 1, 1),
        jack: {
            run: new Animation(0, 0, 32, 64, 4, 1, 2),
            jump_broad: new Animation(0, 64, 64, 64, 4, 2, 2),
            jump: new Animation(0, 128, 32, 64, 4, 1, 2),
            slide: new Animation(0, 192, 32, 64, 4, 1, 2)
        },
        canyon: new Sprite(128, 128, 96, 96, 3, 3),
        large_obstacle: new Sprite(224, 128, 32, 64, 1, 2)
    }
});