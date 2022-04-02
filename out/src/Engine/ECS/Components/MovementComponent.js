class MovementComponent extends Component {
    constructor() {
        super(ComponentTypeEnum.MOVEMENT);
        this.constantAcceleration = { xy: new Vec2(0.0, -10.0), z: 0.0 };
        this.accelerationDirection = { xy: new Vec2(0.0, 0.0), z: 0.0 };
        this.maxAcceleration = { xy: new Vec2(5.0, 0.0) };
        this.velocity = { xy: new Vec2(0.0, 0.0), z: 0.0 };
        this.maxVelocity = { xy: new Vec2(2.0, 100.0), z: 0.0 };
        this.minVelocity = { xy: new Vec2(-1.0, -100.0), z: 0.0 };
        this.wantedVelocity = { xy: new Vec2(0.0, 0.0) };
        this.jumpPower = 5.0;
        this.jumpAllowed = true;
        this.jumpRequested = false;
        this.drag = 0.0;
    }
}
//# sourceMappingURL=MovementComponent.js.map