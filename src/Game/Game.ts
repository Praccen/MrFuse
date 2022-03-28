class Game {
    private rendering: Rendering;

    private testQuad: Quad;

    constructor(rendering: Rendering) {
        this.rendering = rendering;

        this.testQuad = this.rendering.getNewQuad();
        this.testQuad.texture.loadFromFile("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png");
    }


    update(dt: number) {
        this.testQuad.modelMatrix.translate(0.1 * dt, 0.0, 0.0);
        this.testQuad.textureMatrix.translate(0.1 * dt, 0.0, 0.0);
    }
};