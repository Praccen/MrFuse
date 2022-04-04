class TextureStore {
    private gl: WebGL2RenderingContext;
    private textures: Map<string, Texture>;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.textures = new Map<string, Texture>();
    }

    getTexture(path: string): Texture {
        let tex = this.textures.get(path);
        if (tex) {
            return tex;
        }

        let newTexture = new Texture(this.gl, 0);
        newTexture.loadFromFile(path);
        this.textures.set(path, newTexture);
        return newTexture;
    }
}