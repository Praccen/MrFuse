// Globals
let canvas = document.getElementById("gameCanvas");
let input = new Input();
let texturesRequestedVsLoaded = {
    req: 0,
    loaded: 0,
};
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
function resize(gl, rendering) {
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
    //gl.viewport(newGameX, newGameY, newGameWidth, newGameHeight);
    // rendering.reportCanvasResize(newGameWidth, newGameHeight);
}
/* main */
window.onload = () => {
    "use strict";
    let gl = initWebGL();
    let rendering = new Rendering(gl);
    let ecsManager = new ECSManager(rendering);
    let game = new Game(gl, rendering, ecsManager);
    let lastTick = null;
    //Fixed update rate
    let minUpdateRate = 1.0 / 60.0;
    let updateTimer = 0.0;
    let updatesSinceRender = 0;
    let fpsUpdateTimer = 0.0;
    let frameCounter = 0;
    let gameOverTextEnabled = false;
    /* Gameloop */
    function gameLoop() {
        let now = Date.now();
        let dt = (now - (lastTick || now)) * 0.001;
        lastTick = now;
        frameCounter++;
        fpsUpdateTimer += dt;
        if (fpsUpdateTimer > 0.5) {
            let fps = frameCounter / fpsUpdateTimer;
            fpsUpdateTimer -= 0.5;
            frameCounter = 0;
            // console.log(fps); // Uncomment to log fps every half second
        }
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
        if (game.gameOver) {
            if (!gameOverTextEnabled) {
                rendering.printText();
            }
            if (input.keys[' ']) {
                rendering = new Rendering(gl);
                ecsManager = new ECSManager(rendering);
                game = new Game(gl, rendering, ecsManager);
                gameOverTextEnabled = false;
            }
        }
        requestAnimationFrame(gameLoop);
    }
    window.addEventListener("resize", function () {
        resize(gl, rendering);
    });
    function waitForTextureLoading() {
        if (texturesRequestedVsLoaded.loaded < texturesRequestedVsLoaded.req) {
            requestAnimationFrame(waitForTextureLoading);
        }
        else {
            console.log("All " + texturesRequestedVsLoaded.loaded + "/" + texturesRequestedVsLoaded.req + " loaded!");
        }
    }
    console.log("Everything is ready.");
    resize(gl, rendering);
    requestAnimationFrame(waitForTextureLoading);
    requestAnimationFrame(gameLoop);
};
//# sourceMappingURL=main.js.map