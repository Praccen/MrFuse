class MovementComponent extends Component {
    constructor() {
        super(ComponentTypeEnum.MOVEMENT);
        this.constantAcceleration = { x: 0.0, y: -10.0, z: 0.0 };
        this.accelerationDirection = { x: 0.0, y: 0.0, z: 0.0 };
        this.maxAcceleration = { x: 5.0, y: 0.0 };
        this.velocity = { x: 0.0, y: 0.0, z: 0.0 };
        this.maxVelocity = { x: 2.0, y: 100.0, z: 0.0 };
        this.minVelocity = { x: -1.0, y: -100.0, z: 0.0 };
        this.wantedVelocity = { x: 0.0, y: 0.0 };
        this.jumpPower = 5.0;
        this.jumpAllowed = true;
        this.jumpRequested = false;
        this.drag = 0.0;
    }
}
//# sourceMappingURL=MovementComponent.js.map