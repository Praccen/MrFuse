class BombSystem extends System {
    private ecsManager: ECSManager;

    constructor(manager: ECSManager) {
        super([ComponentTypeEnum.BOMB, ComponentTypeEnum.COLLISION, ComponentTypeEnum.ANIMATION, ComponentTypeEnum.POSITION, ComponentTypeEnum.MOVEMENT]);
        this.ecsManager = manager;
    }

    update(dt: number) {
        for(let entity of this.entities) {

            let b = <BombComponent>entity.getComponent(ComponentTypeEnum.BOMB);

            b.timer -= dt;

            if(b.exploding || b.exploded) {
                if (b.timer < -b.explosionTime) {
                    b.exploded = true;
                    this.ecsManager.removeComponent(entity, ComponentTypeEnum.GRAPHICS);
                }    
                continue;
            }

            let c = <CollisionComponent>entity.getComponent(ComponentTypeEnum.COLLISION);

            c.currentCollisionEntities.forEach((ce) => {
                if(ce.hasComponent(ComponentTypeEnum.PLAYER)){
                    // console.log("Time increased");
                    b.timer = b.timer + 1 < b.maxTime ? b.timer + 1 : b.maxTime;

                    // Recalculate bounce
                    let p = <PositionComponent> entity.getComponent(ComponentTypeEnum.POSITION);
                    let p2 = <PositionComponent> ce.getComponent(ComponentTypeEnum.POSITION);
                    let m = <MovementComponent> entity.getComponent(ComponentTypeEnum.MOVEMENT);
                    let m2 = <MovementComponent> ce.getComponent(ComponentTypeEnum.MOVEMENT);
                    if (p2) {
                        const posDiff = new Vec2(p.position.xy.x, p.position.xy.y).subtract(p2.position.xy);
                        m.velocity.xy.x = m.velocity.xy.x + m2.velocity.xy.x + posDiff.x * 10.0;
                        m.accelerationDirection.xy.x += m2.accelerationDirection.xy.x;
                        m.velocity.xy.y = (5.0 + m2.velocity.xy.y) * posDiff.y;
                    }
                }
            })

            let animComp = <AnimationComponent> entity.getComponent(ComponentTypeEnum.ANIMATION);
            let bombStage = Math.max(Math.min(Math.floor((b.timer / b.maxTime) * 3.0), 2.0), 0.0); 
            animComp.startingTile.y = bombStage + 1;

            if(b.timer < 0.0) {
                // console.log("EXPLODE!");
                animComp.startingTile.y = 0.0;
                b.exploding= true;
                c.bounceFactor = 0.0;

                let movComp = <MovementComponent> entity.getComponent(ComponentTypeEnum.MOVEMENT);
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