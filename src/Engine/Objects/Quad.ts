class Quad extends GraphicsObject {
    // Public
    modelMatrix: Matrix4; 
    textureMatrix: Matrix4;
    texture: Texture;

    // Private
    private vertices: Float32Array;
    private indices: Int32Array;
    

    constructor(gl: WebGL2RenderingContext, shaderProgram: ShaderProgram, texture: Texture) {
        super(gl, shaderProgram);

        this.vertices = new Float32Array([ 
            // positions        // colours              // uv
            -0.5,  0.5,  0.0,   0.0, 0.0, 0.0, 0.1,     0.0, 1.0,
            -0.5, -0.5,  0.0,   0.0, 0.0, 0.0, 0.4,     0.0, 0.0,
             0.5, -0.5,  0.0,   0.0, 0.0, 0.0, 0.8,     1.0, 0.0,
             0.5,  0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     1.0, 1.0,
        ]);
        this.indices = new Int32Array([
            0, 1, 2,
            0, 2, 3,
        ]);
        this.setVertexData(this.vertices);
        this.setIndexData(this.indices);

        this.texture = texture;

        this.modelMatrix = new Matrix4(null);
        this.textureMatrix = new Matrix4(null);
    }

    draw() {
        this.bindVAO();

        this.texture.bind();
        this.gl.uniform1i(this.shaderProgram.getUniformLocation("useTexture"), 1);
        this.gl.uniformMatrix4fv(this.shaderProgram.getUniformLocation("modelMatrix"), false, this.modelMatrix.elements);
        this.gl.uniformMatrix4fv(this.shaderProgram.getUniformLocation("textureMatrix"), false, this.textureMatrix.elements);

        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_INT, 0);
    }
};