class TextureStore {
    constructor(gl) {
        this.gl = gl;
        this.textures = new Map();
    }
    getTexture(path) {
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
//# sourceMappingURL=TextureStore.js.map