class TextQuad extends GraphicsObject {
    constructor(gl, shaderProgram, texture) {
        super(gl, shaderProgram);
        this.vertices = new Float32Array([
            // positions        // uv
            -0.5, 1.0, 0.0, 1.0,
            -0.5, 0.0, 0.0, 1.0 - 9.0 / 16.0,
            0.5, 0.0, 1.0, 1.0 - 9.0 / 16.0,
            0.5, 1.0, 1.0, 1.0,
        ]);
        this.indices = new Int32Array([
            0, 1, 2,
            0, 2, 3,
        ]);
        this.setVertexData(this.vertices);
        this.setIndexData(this.indices);
        this.texture = texture;
        this.texture.setTexParameters(this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.texture.setTexParameters(this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }
    draw() {
        this.bindVAO();
        this.texture.bind();
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_INT, 0);
    }
}
;
//# sourceMappingURL=TextQuad.js.map