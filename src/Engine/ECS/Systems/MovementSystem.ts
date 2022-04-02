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
                new Vec2(
                    movComp.accelerationDirection.xy.x *
                        movComp.maxAcceleration.xy.x,
                    movComp.accelerationDirection.xy.y *
                        movComp.maxAcceleration.xy.y
                ).multiply(dt)
            );
            movComp.velocity.xy.add(
                new Vec2(
                    movComp.constantAcceleration.xy.x,
                    movComp.constantAcceleration.xy.y
                ).multiply(dt)
            );
            if (movComp.jumpRequested && movComp.jumpAllowed) {
                movComp.velocity.xy.y = movComp.jumpPower;
                movComp.jumpAllowed = false;
            }

            movComp.velocity.xy.min(movComp.maxVelocity.xy);
            movComp.velocity.xy.max(movComp.minVelocity.xy);

            //Drag
            if (movComp.velocity.xy.x > 0.0 || movComp.velocity.xy.x < 0.0) {
                movComp.velocity.xy.x -=
                    movComp.velocity.xy.x *
                    (1.0 -
                        movComp.accelerationDirection.xy.x *
                            movComp.velocity.xy.x) *
                    movComp.drag *
                    dt;
            }

            //stop if velocity is too slow
            const accelerating = movComp.accelerationDirection.xy.x > 0.0;
            if (accelerating && movComp.velocity.xy.x < 0.01 && movComp.velocity.xy.x > -0.01) {
                movComp.velocity.xy.x = 0.0;
            }

            posComp.position.xy.add(
                new Vec2(movComp.velocity.xy.x, movComp.velocity.xy.y).multiply(
                    dt
                )
            );

            movComp.accelerationDirection.xy.multiply(0.0);

            movComp.jumpRequested = false;
        }
    }
}
