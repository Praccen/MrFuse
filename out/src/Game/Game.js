class Game {
    constructor(rendering) {
        this.rendering = rendering;
        this.input = new Input();
        this.rendering.camera.setZoom(0.5);
        this.testQuad = this.rendering.getNewQuad();
        this.testQuad.texture.loadFromFile("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png");
    }
    update(dt) {
        if (this.input.keys[37]) {
            // Left
            this.testQuad.modelMatrix.translate(-0.5 * dt, 0.0, 0.0);
        }
        if (this.input.keys[38]) {
            // Up
            this.testQuad.modelMatrix.translate(0.0, 0.5 * dt, 0.0);
        }
        if (this.input.keys[39]) {
            // Right
            this.testQuad.modelMatrix.translate(0.5 * dt, 0.0, 0.0);
        }
        if (this.input.keys[40]) {
            // Down
            this.testQuad.modelMatrix.translate(0.0, -0.5 * dt, 0.0);
        }
        // this.testQuad.modelMatrix.translate(0.1 * dt, 0.0, 0.0);
        // this.testQuad.textureMatrix.translate(0.1 * dt, 0.0, 0.0);
    }
}
;
//# sourceMappingURL=Game.js.map