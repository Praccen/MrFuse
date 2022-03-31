class Game {
    constructor(rendering) {
        this.rendering = rendering;
        this.input = new Input();
        this.rendering.camera.setZoom(0.5);
        this.testQuad = this.rendering.getNewQuad();
        this.testQuad.texture.loadFromFile("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png");
    }
    update(dt) {
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
        if (this.input.keys["ArrowLeft"]) {
            // Left
            this.testQuad.modelMatrix.translate(-0.5 * dt, 0.0, 0.0);
        }
        if (this.input.keys["ArrowUp"]) {
            // Up
            this.testQuad.modelMatrix.translate(0.0, 0.5 * dt, 0.0);
        }
        if (this.input.keys["ArrowRight"]) {
            // Right
            this.testQuad.modelMatrix.translate(0.5 * dt, 0.0, 0.0);
        }
        if (this.input.keys["ArrowDown"]) {
            // Down
            this.testQuad.modelMatrix.translate(0.0, -0.5 * dt, 0.0);
        }
        this.testQuad.modelMatrix.setTranslate((this.input.mousePosition.x / canvas.clientWidth) * 2.0 - 1.0, ((canvas.clientHeight - this.input.mousePosition.y) / canvas.clientHeight) * 2.0 - 1.0, 0.0);
        // this.testQuad.modelMatrix.translate(0.1 * dt, 0.0, 0.0);
        // this.testQuad.textureMatrix.translate(0.1 * dt, 0.0, 0.0);
    }
}
;
//# sourceMappingURL=Game.js.map