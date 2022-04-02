class MovementComponent extends Component {
    constantAcceleration: { xy: Vec2; z: number };
    accelerationDirection: { xy: Vec2; z: number };
    maxAcceleration: { xy: Vec2 };
    velocity: { xy: Vec2; z: number };
    maxVelocity: { xy: Vec2; z: number };
    minVelocity: { xy: Vec2; z: number };
    jumpPower: number;
    jumpAllowed: boolean;
    jumpRequested: boolean;
    drag: number;

    constructor() {
        super(ComponentTypeEnum.MOVEMENT);
        this.constantAcceleration = { xy: new Vec2(0.0, -10.0), z: 0.0 };
        this.accelerationDirection = { xy: new Vec2(0.0, 0.0), z: 0.0 };
        this.maxAcceleration = { xy: new Vec2(10.0, 0.0) };
        this.velocity = { xy: new Vec2(0.0, 0.0), z: 0.0 };
        this.maxVelocity = { xy: new Vec2(3.0, 100.0), z: 0.0 };
        this.minVelocity = { xy: new Vec2(-3.0, -100.0), z: 0.0 };
        this.jumpPower = 5.0;
        this.jumpAllowed = true;
        this.jumpRequested = false;
        this.drag = 5.0;
    }
}
