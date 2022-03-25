class TestObject extends GraphicsObject {
    private vertices: Float32Array;

    constructor(gl: WebGL2RenderingContext, shaderProgram: ShaderProgram) {
        super(gl, shaderProgram);

        this.vertices = new Float32Array([ 
            // positions        // colours              // uv
            -0.5,  0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     0.0, 1.0,
            -0.5, -0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     0.0, 0.0,
             0.5, -0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     1.0, 0.0,
    
            -0.5,  0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     0.0, 1.0,
             0.5, -0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     1.0, 0.0,
             0.5,  0.5,  0.0,   0.0, 0.0, 0.0, 1.0,     1.0, 1.0
        ]);
        this.setVertexData(this.vertices);
    }

    draw() {
        this.bindVAO();

        this.gl.activeTexture(this.gl.TEXTURE0);
        // this.gl.bindTexture(this.gl.TEXTURE_2D, 0);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
};