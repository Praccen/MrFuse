class GraphicsObject {
    // Protected
    protected gl: WebGL2RenderingContext;
    protected shaderProgram: ShaderProgram;

    // Private
    private VAO: WebGLVertexArrayObject;
    private VBO: WebGLBuffer;
    private EBO: WebGLBuffer;

    constructor(gl: WebGL2RenderingContext, shaderProgram: ShaderProgram) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;

        this.VAO = null;
        this.VBO = null;
        this.EBO = null; // Optional

        this.init();
    }

    init() {
        // Create buffers
        this.VAO = this.gl.createVertexArray();
        this.VBO = this.gl.createBuffer();
        this.EBO = this.gl.createBuffer();
        
        // Bind buffers
        this.gl.bindVertexArray(this.VAO);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.VBO);
    
        this.shaderProgram.setupVertexAttributePointers();
    
        this.gl.bindVertexArray(null);
    }

    changeShaderProgram(shaderProgram) {
        this.shaderProgram = shaderProgram;
    }

    bindVAO() {
        this.gl.bindVertexArray(this.VAO);
    }

    unbindVAO() {
        this.gl.bindVertexArray(0);
    }

    setVertexData(data: Float32Array) {
        this.gl.bindVertexArray(this.VAO);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
        this.gl.bindVertexArray(null);
    }

    setIndexData(data: Int32Array) {
        this.gl.bindVertexArray(this.VAO);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.EBO);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    
        this.gl.bindVertexArray(null);
    }

    draw() { // Can this be virtual? 

    }
};