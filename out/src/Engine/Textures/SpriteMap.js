class SpriteMap {
    constructor() {
        this.nrOfSprites = { x: 1.0, y: 1.0 };
        this.currentSprite = { x: 0.0, y: 0.0 };
    }
    updateTextureMatrix(matrix) {
        matrix.setIdentity();
        let spriteSizeX = 1.0 / Math.max(this.nrOfSprites.x, 0.000001);
        let spriteSizeY = 1.0 / Math.max(this.nrOfSprites.y, 0.000001);
        matrix.translate(this.currentSprite.x * spriteSizeX, this.currentSprite.y * spriteSizeY, 0.0);
        matrix.scale(spriteSizeX, spriteSizeY, 1.0);
    }
    setNrOfSprites(x, y) {
        this.nrOfSprites.x = x;
        this.nrOfSprites.y = y;
    }
    setCurrentSprite(x, y) {
        this.currentSprite.x = x;
        this.currentSprite.y = y;
    }
    advanceSpriteBy(x, y) {
        this.currentSprite.x += x;
        this.currentSprite.y += y;
    }
}
;
//# sourceMappingURL=SpriteMap.js.map