class MovementComponent extends Component {
    constantAcceleration: {x: number, y: number, z: number};
    accelerationDirection: {x: number, y: number, z: number};
    velocity: {x: number, y: number, z: number};
    drag: number;

    constructor() {
        super(ComponentTypeEnum.MOVEMENT);
        this.constantAcceleration = {x: 0.0, y: 0.0, z: 0.0};
        this.accelerationDirection = {x: 0.0, y: 0.0, z: 0.0};
        this.velocity = {x: 0.0, y: 0.0, z: 0.0};
        this.drag = 0.0;
    }
};