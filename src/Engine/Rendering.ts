class Rendering {
	// public
	camera: Camera;

	// private
	private gl: WebGL2RenderingContext;
	private texturesRequestedVsLoaded: object;

	private simpleShaderProgram: SimpleShaderProgram;
	private crtShaderProgram: CrtShaderProgram;
	private screenQuadShaderProgram: ScreenQuadShaderProgram;

	private quads: Array<Quad>;

	private crtFramebuffer: Framebuffer;
	private crtQuad: ScreenQuad;

	private screenFramebuffer: Framebuffer;
	private screenQuad: ScreenQuad;

	constructor(gl: WebGL2RenderingContext, texturesRequestedVsLoaded: object) {
		this.gl = gl;
        this.texturesRequestedVsLoaded = texturesRequestedVsLoaded;
		this.camera = new Camera(gl);

		this.simpleShaderProgram = new SimpleShaderProgram(this.gl);
		this.crtShaderProgram = new CrtShaderProgram(this.gl);
		this.screenQuadShaderProgram = new ScreenQuadShaderProgram(this.gl);

		this.crtFramebuffer = new Framebuffer(this.gl, this.gl.canvas.width, this.gl.canvas.height);
		this.crtQuad = new ScreenQuad(this.gl, this.crtShaderProgram, this.crtFramebuffer.texture);

		this.screenFramebuffer = new Framebuffer(this.gl, this.gl.canvas.width, this.gl.canvas.height);
		this.screenQuad = new ScreenQuad(this.gl, this.screenQuadShaderProgram, this.screenFramebuffer.texture);
		this.initGL();

		this.quads = new Array<Quad>();
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

	getNewQuad(): Quad {
		const length = this.quads.push(new Quad(this.gl, this.simpleShaderProgram, new Texture(this.gl, 0)));
		return this.quads[length-1];
	}

	draw() {
		// Render scene to crt framebuffer
		this.crtFramebuffer.bind(this.gl.FRAMEBUFFER);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		
		this.simpleShaderProgram.use();
		this.camera.bindViewMatrix(this.simpleShaderProgram.getUniformLocation("viewMatrix"));
		for (let quad of this.quads.values()) {
			quad.draw();
		}

		// Disable depth for screen quad(s) rendering
		this.gl.disable(this.gl.DEPTH_TEST); 

		// Crt effect
		this.screenFramebuffer.bind(this.gl.DRAW_FRAMEBUFFER); // Set screen framebuffer as output
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);    
		this.crtShaderProgram.use();
		this.crtQuad.draw();

		// Render to screen quad
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null); // Render directly to screen
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		this.screenQuadShaderProgram.use();
		this.screenQuad.draw();
		// this.input.draw();
	}
};