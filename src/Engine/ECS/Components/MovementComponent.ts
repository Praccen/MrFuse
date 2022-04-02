class MovementComponent extends Component {
    constantAcceleration: { x: number; y: number; z: number };
    accelerationDirection: { x: number; y: number; z: number };
    maxAcceleration: { x: number; y: number };
    velocity: { x: number; y: number; z: number };
    maxVelocity: { x: number; y: number; z: number };
    minVelocity: { x: number; y: number; z: number };
    wantedVelocity: { x: number; y: number };
    jumpPower: number;
    jumpAllowed: boolean;
    jumpRequested: boolean;
    drag: number;

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
