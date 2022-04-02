class SpriteMap {
    nrOfSprites: {x:number, y: number};
	currentSprite: {x:number, y: number};

    constructor() {
        this.nrOfSprites = {x: 1.0, y: 1.0};
        this.currentSprite = {x: 0.0, y: 0.0};
    }

    updateTextureMatrix(matrix: Matrix4) {
        matrix.setIdentity();
        let spriteSizeX = 1.0 / Math.max(this.nrOfSprites.x, 0.000001);
        let spriteSizeY = 1.0 / Math.max(this.nrOfSprites.y, 0.000001);
        matrix.translate(this.currentSprite.x * spriteSizeX, this.currentSprite.y * spriteSizeY, 0.0);
        matrix.scale(spriteSizeX, spriteSizeY, 1.0);
    }

    setNrOfSprites(x: number, y: number) {
        this.nrOfSprites.x = x;
        this.nrOfSprites.y = y;
    }
    
    setCurrentSprite(x: number, y: number) {
        this.currentSprite.x = x;
        this.currentSprite.y = y;
    }

	advanceSpriteBy(x: number, y: number) {
        this.currentSprite.x += x;
        this.currentSprite.y += y;
    }
    
};