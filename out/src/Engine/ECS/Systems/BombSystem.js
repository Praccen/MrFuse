class BombSystem extends System {
    constructor() {
        super([ComponentTypeEnum.BOMB, ComponentTypeEnum.COLLISION, ComponentTypeEnum.ANIMATION]);
    }
    update(dt) {
        for (let entity of this.entities) {
            let b = entity.getComponent(ComponentTypeEnum.BOMB);
            if (b.exploded)
                continue;
            let c = entity.getComponent(ComponentTypeEnum.COLLISION);
            c.currentCollisionEntities.forEach((ce) => {
                if (ce.hasComponent(ComponentTypeEnum.PLAYER)) {
                    console.log("Time increased");
                    b.timer = b.timer + 1 < b.maxTime ? b.timer + 1 : b.maxTime;
                }
            });
            b.timer -= dt;
            let animComp = entity.getComponent(ComponentTypeEnum.ANIMATION);
            let bombStage = Math.max(Math.min(Math.floor((b.timer / b.maxTime) * 2.0), 2.0), 0.0);
            animComp.startingTile.y = bombStage + 1;
            if (b.timer < 0.0) {
                console.log("EXPLODE!");
                animComp.startingTile.y = 0.0;
                b.exploded = true;
                c.bounce = false;
                let movComp = entity.getComponent(ComponentTypeEnum.MOVEMENT);
                if (movComp) {
                    movComp.constantAcceleration.xy.multiply(0.0);
                    movComp.velocity.xy.multiply(0.0);
                    c.effectMovement = false;
                    c.isConstraint = true;
                }
            }
        }
    }
}
//# sourceMappingURL=BombSystem.js.map