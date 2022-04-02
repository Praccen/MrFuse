class InputSystem extends System {
    private input: Input;

    constructor() {
        super([ComponentTypeEnum.MOVEMENT, ComponentTypeEnum.INPUT]);

        this.input = new Input();
    }

    update() {
        this.entities.forEach((e) => {
            let movComp = <MovementComponent>(
                e.getComponent(ComponentTypeEnum.MOVEMENT)
            );

            if (this.input.keys["w"]) {
                movComp.jumpRequested = true;
                movComp.accelerationDirection.xy.y += 1.0;
            }

            if (this.input.keys["s"]) {
                movComp.accelerationDirection.xy.y += -1.0;
            }

            if (this.input.keys["a"]) {
                movComp.accelerationDirection.xy.x += -1.0;
            }

            if (this.input.keys["d"]) {
                movComp.accelerationDirection.xy.x += 1.0;
            }
        });
    }
}
