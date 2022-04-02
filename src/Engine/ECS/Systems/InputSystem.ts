class InputSystem extends System {
    constructor() {
        super([ComponentTypeEnum.MOVEMENT, ComponentTypeEnum.INPUT]);
    }

    update() {
        this.entities.forEach((e) => {
            let movComp = <MovementComponent>(
                e.getComponent(ComponentTypeEnum.MOVEMENT)
            );

            if (input.keys["w"]) {
                movComp.jumpRequested = true;
                movComp.accelerationDirection.xy.y += 1.0;
            }

            if (input.keys["s"]) {
                movComp.accelerationDirection.xy.y += -1.0;
            }

            if (input.keys["a"]) {
                movComp.accelerationDirection.xy.x += -1.0;
            }

            if (input.keys["d"]) {
                movComp.accelerationDirection.xy.x += 1.0;
            }
        });
    }
}
