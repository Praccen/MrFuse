let canvas = document.getElementById("gameCanvas");
function initWebGL() {
    canvas.width = 1920;
    canvas.height = 1080;
    let gl = canvas.getContext("webgl2");
    if (!gl) {
        console.log("Failed to get rendering context for WebGL");
        return;
    }
    return gl;
}
function resize(gl) {
    // Get the dimensions of the viewport
    let viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    let newGameHeight;
    let newGameWidth;
    // Determine game size
    if (gl.canvas.height / gl.canvas.width > viewport.height / viewport.width) {
        newGameHeight = viewport.height;
        newGameWidth = newGameHeight * gl.canvas.width / gl.canvas.height;
    }
    else {
        newGameWidth = viewport.width;
        newGameHeight = newGameWidth * gl.canvas.height / gl.canvas.width;
    }
    let newGameX = (viewport.width - newGameWidth) / 2;
    let newGameY = (viewport.height - newGameHeight) / 2;
    // Center the game by setting the padding of the game
    gl.canvas.style.padding = newGameY + "px " + newGameX + "px";
    // Resize game
    gl.canvas.style.width = newGameWidth + "px";
    gl.canvas.style.height = newGameHeight + "px";
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}
/* main */
window.onload = () => {
    "use strict";
    let gl = initWebGL();
    let texturesRequestedVsLoaded = {
        req: 0,
        loaded: 0,
    };
    const rendering = new Rendering(gl, texturesRequestedVsLoaded);
    const ecsManager = new ECSManager(rendering);
    const game = new Game(rendering, ecsManager);
    window.addEventListener("resize", function () {
        resize(gl);
    });
    let lastTick = null;
    //Fixed update rate
    let minUpdateRate = 1.0 / 60.0;
    let updateTimer = 0.0;
    let updatesSinceRender = 0;
    function waitForTextureLoading() {
        if (texturesRequestedVsLoaded.loaded < texturesRequestedVsLoaded.req) {
            requestAnimationFrame(waitForTextureLoading);
        }
    }
    /* Gameloop */
    function gameLoop() {
        let now = Date.now();
        let dt = (now - (lastTick || now)) * 0.001;
        lastTick = now;
        // Constant update rate
        updateTimer += dt;
        updatesSinceRender = 0;
        //Only update if update timer goes over update rate
        while (updateTimer >= minUpdateRate) {
            if (updatesSinceRender >= 20) {
                // Too many updates, throw away the rest of dt (makes the game run in slow-motion)
                updateTimer = 0;
                break;
            }
            game.update(minUpdateRate);
            ecsManager.update(minUpdateRate);
            updateTimer -= minUpdateRate;
            updatesSinceRender++;
        }
        if (updatesSinceRender == 0) { // dt is faster than min update rate, allow faster updates
            game.update(updateTimer);
            ecsManager.update(updateTimer);
            updateTimer = 0.0;
        }
        ecsManager.updateRenderingSystems(dt);
        rendering.draw();
        requestAnimationFrame(gameLoop);
    }
    console.log("Everything is ready.");
    resize(gl);
    requestAnimationFrame(waitForTextureLoading);
    requestAnimationFrame(gameLoop);
};
//# sourceMappingURL=main.js.map