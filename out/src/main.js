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
    const game = new Game(rendering);
    window.addEventListener("resize", function () {
        resize(gl);
    });
    let lastTick = null;
    //Fixed update rate
    let updateRatio = 1.0 / 60.0;
    let updateTimer = 0.0;
    let maxCounter = 0;
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
        maxCounter = 0;
        //Only update if update timer goes over update rate
        while (updateTimer >= updateRatio) {
            if (maxCounter >= 20) {
                updateTimer = 0;
                break;
            }
            game.update(updateRatio);
            updateTimer -= updateRatio;
            maxCounter++;
        }
        //Only draw if game has been updated.
        if (maxCounter != 0) {
            rendering.draw();
        }
        requestAnimationFrame(gameLoop);
    }
    console.log("Everything is ready.");
    resize(gl);
    requestAnimationFrame(waitForTextureLoading);
    requestAnimationFrame(gameLoop);
};
//# sourceMappingURL=main.js.map