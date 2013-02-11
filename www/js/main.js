require(['app', 'inputhandler', 'lib/Modernizr/modernizr', 'lib/domReady'], function (App, InputHandler) {

    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var screen = document.getElementById('screen');
    var background = document.getElementById('background');
    var inputHandler = new InputHandler();

    if (Modernizr.touch) {
        screen.addEventListener('touchstart', inputHandler.handleTouchStart, false);
        screen.addEventListener('touchmove', inputHandler.handleTouchMove, false);
        screen.addEventListener('touchend', inputHandler.handleTouchEnd, false);
    }

    var app = new App(inputHandler);
});
