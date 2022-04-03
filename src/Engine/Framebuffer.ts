class Framebuffer {
    // Public
    texture: Texture;

    // Private
    private gl: WebGL2RenderingContext;
    private fbo: WebGLFramebuffer;
    private rbo: WebGLRenderbuffer;
    private width: number;
    private height: number;

    constructor(gl: WebGL2RenderingContext, width: number, height: number) {
        this.gl = gl;
        this.width = width;
        this.height = height;

        this.fbo = this.gl.createFramebuffer();
        this.texture = new Texture(this.gl, 0);
        this.rbo = this.gl.createRenderbuffer();

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.texture);
        this.texture.setTextureData(null, this.width, this.height);
        this.texture.setTexParameters(this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.texture.setTexParameters(this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture.texture, 0);

        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.rbo);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH24_STENCIL8, this.width, this.height); 
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.rbo); 

        if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) != this.gl.FRAMEBUFFER_COMPLETE) {
            console.warn("ERROR::FRAMEBUFFER:: Framebuffer is not complete!");
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    setProportions(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.texture.setTextureData(null, this.width, this.height);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo);
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.rbo);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH24_STENCIL8, width, height);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    bind(target: number) {
        this.gl.bindFramebuffer(target, this.fbo);
    }
};