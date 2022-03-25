class Rendering {
    constructor(gl, texturesRequestedVsLoaded) {
        this.gl = gl;
        this.texturesRequestedVsLoaded = texturesRequestedVsLoaded;
        this.camera = new Camera(gl);
        this.audioPlayer = new AudioPlayer();
        this.input = new Input(gl, this.camera, this.audioPlayer, this.texturesRequestedVsLoaded);
        this.simpleShaderProgram = new SimpleShaderProgram(this.gl);
        this.testObject = new TestObject(this.gl, this.simpleShaderProgram);
        this.initGL();
    }
    initGL() {
        this.gl.clearColor(0.3, 0.2, 0.4, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.BLEND);
        this.gl.lineWidth(3.0); // Sets line width of things like wireframe and draw lines
    }
    update(dt) {
        this.input.update(dt);
    }
    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        this.simpleShaderProgram.use();
        this.testObject.draw();
        this.input.draw();
    }
}
;
//# sourceMappingURL=Rendering.js.map