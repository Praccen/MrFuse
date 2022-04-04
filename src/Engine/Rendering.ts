class Rendering {
	// public
	camera: Camera;

    useCrt: boolean;

	// private
	private gl: WebGL2RenderingContext;
    private textureStore: TextureStore;
	private texturesRequestedVsLoaded: object;

	private simpleShaderProgram: SimpleShaderProgram;
	private crtShaderProgram: CrtShaderProgram;
	private screenQuadShaderProgram: ScreenQuadShaderProgram;

	private quads: Array<Quad>;

	private crtFramebuffer: Framebuffer;
	private crtQuad: ScreenQuad;

	private screenFramebuffer: Framebuffer;
	private screenQuad: ScreenQuad;
    private textQuad: ScreenQuad;
    private buttonsQuad: ScreenQuad;

	constructor(gl: WebGL2RenderingContext) {
		this.gl = gl;
        this.textureStore = new TextureStore(gl);
		this.camera = new Camera(gl);

        this.useCrt = true;

		this.simpleShaderProgram = new SimpleShaderProgram(this.gl);
		this.crtShaderProgram = new CrtShaderProgram(this.gl);
		this.screenQuadShaderProgram = new ScreenQuadShaderProgram(this.gl);

		this.crtFramebuffer = new Framebuffer(this.gl, this.gl.canvas.width, this.gl.canvas.height);
		this.crtQuad = new ScreenQuad(this.gl, this.crtShaderProgram, this.crtFramebuffer.texture);

		this.screenFramebuffer = new Framebuffer(this.gl, this.gl.canvas.width, this.gl.canvas.height);
		this.screenQuad = new ScreenQuad(this.gl, this.screenQuadShaderProgram, this.screenFramebuffer.texture);
        this.textQuad = null;

        this.buttonsQuad = new ScreenQuad(this.gl, this.screenQuadShaderProgram, this.textureStore.getTexture("Assets/Textures/Buttons/Buttons.png"));

		this.initGL();

		this.quads = new Array<Quad>();
	}

	initGL() {
		this.gl.clearColor(0.25, 0.2, 0.6, 1.0);
	
		// Enable depth test
		this.gl.enable(this.gl.DEPTH_TEST);
		
		//Enable alpha blending
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		
		// Disable faceculling
		this.gl.disable(this.gl.CULL_FACE);
	
		this.gl.lineWidth(3.0); // Sets line width of things like wireframe and draw lines
	}

    reportCanvasResize(x: number, y: number) {
        this.crtFramebuffer.setProportions(x, y);
        this.screenFramebuffer.setProportions(x, y);
        console.log("X: " + x + " px " + "Y: " + y + " px");
    }

    loadTextureToStore(texturePath: string) {
        this.textureStore.getTexture(texturePath);
    }

	getNewQuad(texturePath: string): Quad {
		const length = this.quads.push(new Quad(this.gl, this.simpleShaderProgram, this.textureStore.getTexture(texturePath)));
		return this.quads[length-1];
	}

    printWin(): void {
        const texture = this.textureStore.getTexture("Assets/Textures/Text/GameWinText.png");
		this.textQuad= new ScreenQuad(this.gl, this.screenQuadShaderProgram, texture);
    }
    printLost(): void {
        const texture = this.textureStore.getTexture("Assets/Textures/Text/GameOverText.png");
		this.textQuad= new ScreenQuad(this.gl, this.screenQuadShaderProgram, texture);
    }

    clearText(): void {
        this.textQuad = null;
    }

    deleteQuad(quad: Quad) {
        let index = this.quads.findIndex(q => q == quad);
        if (index != -1) {
            this.quads.splice(index, 1);
        }
    }

	draw() {
        if (this.useCrt ) {
            // Render scene to crt framebuffer
            this.crtFramebuffer.bind(this.gl.FRAMEBUFFER);
        }
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		
		this.simpleShaderProgram.use();
		this.camera.bindViewMatrix(this.simpleShaderProgram.getUniformLocation("viewMatrix"));

		for (let quad of this.quads.values()) {
			quad.draw();
		}

		// Disable depth for screen quad(s) rendering
		this.gl.disable(this.gl.DEPTH_TEST); 

        if (this.textQuad){
            this.screenQuadShaderProgram.use();
            this.textQuad.draw();
        }

        if (input.drawHud) {
            this.screenQuadShaderProgram.use();
            this.buttonsQuad.draw();
        }

        if (this.useCrt) {
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
        }
	}
};