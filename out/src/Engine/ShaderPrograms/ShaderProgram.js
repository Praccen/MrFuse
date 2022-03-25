class ShaderProgram {
    constructor(gl, vertexShaderName, fragmentShaderName) {
        this.gl = gl;
        this.shaderProgram = null;
        this.loadShaders(vertexShaderName, fragmentShaderName);
    }
    loadShaders(vertexShaderString, fragmentShaderString) {
        // link shaders
        if (this.shaderProgram != null) {
            this.gl.deleteProgram(this.shaderProgram); // Delete in case this is not the first time this shader is created.
        }
        // vertex shader
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexShaderString);
        this.gl.compileShader(vertexShader);
        // TODO: check for shader compile errors?
        let compiledVS = this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS);
        console.log('Vertex shader compiled successfully: ' + compiledVS);
        let compilationLogVS = this.gl.getShaderInfoLog(vertexShader);
        console.log('Vertex shader compiler log: \n' + compilationLogVS);
        // fragment shader
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentShaderString);
        this.gl.compileShader(fragmentShader);
        // TODO: check for shader compile errors?
        let compiledFS = this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS);
        console.log('Fragment shader compiled successfully: ' + compiledFS);
        let compilationLogFS = this.gl.getShaderInfoLog(fragmentShader);
        console.log('Fragment shader compiler log: \n' + compilationLogFS);
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);
        // TODO: check for linking errors?
        // Delete shaders now that they have been made into a program
        this.gl.deleteShader(vertexShader);
        this.gl.deleteShader(fragmentShader);
        // this.shaderProgram = WebGLUtils.createProgramFromScripts(this.gl, [vertexShaderName, fragmentShaderName]);
    }
    use() {
        this.gl.useProgram(this.shaderProgram);
    }
    setupVertexAttributePointers() {
    }
    setupInstancedVertexAttributePointers() {
    }
    getUniformLocation(uniformName) {
        if (!(this.uniformBindings.has(uniformName))) {
            console.log("No uniform with name " + uniformName + "\n");
        }
        else {
            return this.uniformBindings[uniformName];
        }
        return 0;
    }
}
;
// ShaderProgram::~ShaderProgram() {
//     glDeleteProgram(p_shaderProgram);
// }
//# sourceMappingURL=ShaderProgram.js.map