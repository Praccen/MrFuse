class ScreenQuad extends GraphicsObject {
    constructor(gl, shaderProgram, texture) {
        super(gl, shaderProgram);
        this.vertices = new Float32Array([
            // positions        // uv
            -1.0, 1.0, 0.0, 1.0,
            -1.0, -1.0, 0.0, 0.0,
            1.0, -1.0, 1.0, 0.0,
            1.0, 1.0, 1.0, 1.0,
        ]);
        this.indices = new Int32Array([
            0, 1, 2,
            0, 2, 3,
        ]);
        this.setVertexData(this.vertices);
        this.setIndexData(this.indices);
        this.texture = texture;
    }
    draw() {
        this.bindVAO();
        this.texture.bind();
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_INT, 0);
    }
}
;
//# sourceMappingURL=ScreenQuad.js.map