class BombSystem extends System {
    constructor(manager) {
        super([ComponentTypeEnum.BOMB, ComponentTypeEnum.COLLISION, ComponentTypeEnum.ANIMATION, ComponentTypeEnum.POSITION, ComponentTypeEnum.MOVEMENT]);
        this.ecsManager = manager;
    }
    update(dt) {
        for (let entity of this.entities) {
            let b = entity.getComponent(ComponentTypeEnum.BOMB);
            b.timer -= dt;
            if (b.exploding || b.exploded) {
                if (b.timer < -b.explosionTime) {
                    b.exploded = true;
                }
                continue;
            }
            let c = entity.getComponent(ComponentTypeEnum.COLLISION);
            c.currentCollisionEntities.forEach((ce) => {
                if (ce.hasComponent(ComponentTypeEnum.PLAYER)) {
                    console.log("Time increased");
                    b.timer = b.timer + 1 < b.maxTime ? b.timer + 1 : b.maxTime;
                    // Recalculate bounce
                    let p = entity.getComponent(ComponentTypeEnum.POSITION);
                    let p2 = ce.getComponent(ComponentTypeEnum.POSITION);
                    let m = entity.getComponent(ComponentTypeEnum.MOVEMENT);
                    let m2 = ce.getComponent(ComponentTypeEnum.MOVEMENT);
                    if (p2) {
                        const posDiff = new Vec2(p.position.xy.x, p.position.xy.y).subtract(p2.position.xy);
                        m.velocity.xy.x = m.velocity.xy.x + m2.velocity.xy.x + posDiff.x * 10.0;
                        m.accelerationDirection.xy.x += m2.accelerationDirection.xy.x;
                        m.velocity.xy.y = (5.0 + m2.velocity.xy.y) * posDiff.y;
                    }
                }
            });
            let animComp = entity.getComponent(ComponentTypeEnum.ANIMATION);
            let bombStage = Math.max(Math.min(Math.floor((b.timer / b.maxTime) * 3.0), 2.0), 0.0);
            animComp.startingTile.y = bombStage + 1;
            if (b.timer < 0.0) {
                console.log("EXPLODE!");
                animComp.startingTile.y = 0.0;
                b.exploding = true;
                c.bounceFactor = 0.0;
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