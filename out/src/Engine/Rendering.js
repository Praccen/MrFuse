class Rendering {
    constructor(gl, texturesRequestedVsLoaded) {
        this.gl = gl;
        this.texturesRequestedVsLoaded = texturesRequestedVsLoaded;
        this.camera = new Camera(gl);
        this.simpleShaderProgram = new SimpleShaderProgram(this.gl);
        this.initGL();
        this.quads = new Array();
    }
    initGL() {
        this.gl.clearColor(0.3, 0.2, 0.4, 1.0);
        // Enable depth test
        this.gl.enable(this.gl.DEPTH_TEST);
        //Enable alpha blending
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        // Disable faceculling
        this.gl.disable(this.gl.CULL_FACE);
        this.gl.lineWidth(3.0); // Sets line width of things like wireframe and draw lines
    }
    getNewQuad() {
        const length = this.quads.push(new Quad(this.gl, this.simpleShaderProgram, new Texture(this.gl, 0)));
        return this.quads[length - 1];
    }
    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        this.simpleShaderProgram.use();
        this.camera.bindViewMatrix(this.simpleShaderProgram.getUniformLocation("viewMatrix"));
        for (let quad of this.quads.values()) {
            quad.draw();
        }
        // this.input.draw();
    }
}
;
//# sourceMappingURL=Rendering.js.map