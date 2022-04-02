class MovementSystem extends System {
    constructor() {
        super([ComponentTypeEnum.POSITION, ComponentTypeEnum.MOVEMENT]);
    }

    update(dt: number) {
        for (const e of this.entities) {
            let posComp = <PositionComponent>(
                e.getComponent(ComponentTypeEnum.POSITION)
            );
            let movComp = <MovementComponent>(
                e.getComponent(ComponentTypeEnum.MOVEMENT)
            );

            // Do movement calculations and set positions accordingly
            movComp.velocity.xy.add(
                new Vec2(movComp.accelerationDirection.xy.x * movComp.maxAcceleration.xy.x,
                    movComp.accelerationDirection.xy.y * movComp.maxAcceleration.xy.y
                ).multiply(dt));
            movComp.velocity.xy.add(new Vec2(movComp.constantAcceleration.xy.x, movComp.constantAcceleration.xy.y).multiply(dt));
            if (movComp.jumpRequested && movComp.jumpAllowed) {
                movComp.velocity.xy.y = movComp.jumpPower;
                movComp.jumpAllowed = false;
            }

            movComp.velocity.xy.min(movComp.maxVelocity.xy);
            movComp.velocity.xy.max(movComp.minVelocity.xy);

            posComp.position.xy.add(new Vec2(movComp.velocity.xy.x, movComp.velocity.xy.y).multiply(dt));

            movComp.accelerationDirection.xy.multiply(0.0);

            //temporary reset jumpAllowed here
            if (posComp.position.xy.y <= 0.0) {
                movComp.jumpAllowed = true;
            }

            movComp.jumpRequested = false;
            // console.log(movComp.velocity);
        }
    }
}
