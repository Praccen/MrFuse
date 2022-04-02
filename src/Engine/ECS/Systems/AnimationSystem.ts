class AnimationSystem extends System {
    constructor() {
        super([ComponentTypeEnum.GRAPHICS, ComponentTypeEnum.ANIMATION]);
    }

    update(dt: number) {
        for (const e of this.entities) {
            let graphComp = <GraphicsComponent> e.getComponent(ComponentTypeEnum.GRAPHICS);
            let animComp = <AnimationComponent> e.getComponent(ComponentTypeEnum.ANIMATION);

            if (graphComp && animComp) {
                animComp.updateTimer += dt;

                animComp.advancements += Math.floor(animComp.updateTimer / Math.max(animComp.updateInterval, 0.000001));
                animComp.updateTimer = animComp.updateTimer % Math.max(animComp.updateInterval, 0.000001);

                const xAdvance = (animComp.advanceBy.x * animComp.advancements) % (Math.max(animComp.modAdvancement.x, 1.0));
                const yAdvance = (animComp.advanceBy.y * animComp.advancements) % (Math.max(animComp.modAdvancement.y, 1.0));

                animComp.spriteMap.setCurrentSprite(animComp.startingTile.x + xAdvance, animComp.startingTile.y + yAdvance);
                animComp.spriteMap.updateTextureMatrix(graphComp.quad.textureMatrix);
            }
        }
    }
};