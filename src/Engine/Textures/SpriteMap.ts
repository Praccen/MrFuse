class SpriteMap {
    nrOfSprites: {x:number, y: number};
	currentSprite: {x:number, y: number};
    textureMatrix: Matrix4;

    constructor() {
        this.nrOfSprites = {x: 1.0, y: 1.0};
        this.currentSprite = {x: 0.0, y: 0.0};
        this.textureMatrix = new Matrix4(null);
    }

    updateTextureMatrix() {
        this.textureMatrix.setIdentity();
        let spriteSizeX = 1.0 / Math.max(this.nrOfSprites.x, 0.000001);
        let spriteSizeY = 1.0 / Math.max(this.nrOfSprites.y, 0.000001);
        this.textureMatrix.translate(this.currentSprite.x * spriteSizeX, this.currentSprite.y * spriteSizeY, 0.0);
        this.textureMatrix.scale(spriteSizeX, spriteSizeY, 1.0);
    }

    setNrOfSprites(x: number, y: number) {
        this.nrOfSprites.x = x;
        this.nrOfSprites.y = y;
        this.updateTextureMatrix();
    }
    
    setCurrentSprite(x: number, y: number) {
        this.currentSprite.x = x;
        this.currentSprite.y = y;
        this.updateTextureMatrix();
    }

	advanceSpriteBy(x: number, y: number) {
        this.currentSprite.x += x;
        this.currentSprite.y += y;
        this.updateTextureMatrix();
    }
    
};