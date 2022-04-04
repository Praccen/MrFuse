class InputSystem extends System {
    constructor() {
        super([ComponentTypeEnum.MOVEMENT, ComponentTypeEnum.INPUT]);
    }

    update() {
        this.entities.forEach((e) => {
            let movComp = <MovementComponent>(
                e.getComponent(ComponentTypeEnum.MOVEMENT)
            );

            if (input.keys["w"] || input.keys["ArrowUp"] ) {
                movComp.jumpRequested = true;
                movComp.accelerationDirection.xy.y += 1.0;
            }

            if (input.keys["s"] || input.keys["ArrowDown"]) {
                movComp.accelerationDirection.xy.y += -1.0;
            }

            if (input.keys["a"] || input.keys["ArrowLeft"]) {
                movComp.accelerationDirection.xy.x += -1.0;
            }

            if (input.keys["d"] || input.keys["ArrowRight"]) {
                movComp.accelerationDirection.xy.x += 1.0;
            }
        });
    }
}
