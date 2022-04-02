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
            Object.keys(posComp.position).forEach((coord) => {
                movComp.velocity[coord] +=
                    movComp.accelerationDirection[coord] * dt;

                movComp.velocity[coord] +=
                    movComp.constantAcceleration[coord] * dt;

                movComp.velocity[coord] = Math.min(
                    movComp.velocity[coord],
                    movComp.maxVelocity[coord]
                );
                movComp.velocity[coord] = Math.max(
                    movComp.velocity[coord],
                    movComp.minVelocity[coord]
                );

                if (
                    movComp.jumpRequested &&
                    movComp.jumpAllowed &&
                    coord == "y"
                ) {
                    movComp.velocity.y = movComp.jumpPower;
                    movComp.jumpAllowed = false;
                }

                posComp.position[coord] += movComp.velocity[coord] * dt;

                movComp.accelerationDirection[coord] = 0.0;
            });

            //temporary reset jumpAllowed here
            if (posComp.position.y <= 0.0) {
                movComp.jumpAllowed = true;
            }

            movComp.jumpRequested = false;
            console.log(movComp.velocity);
        }
    }
}
