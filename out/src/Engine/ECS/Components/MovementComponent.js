class MovementComponent extends Component {
    constructor() {
        super(ComponentTypeEnum.MOVEMENT);
        this.constantAcceleration = new Vector3({ x: 0.0, y: 0.0, z: 0.0 });
        this.accelerationDirection = new Vector3({ x: 0.0, y: 0.0, z: 0.0 });
        this.velocity = new Vector3({ x: 0.0, y: 0.0, z: 0.0 });
        this.drag = 0.0;
    }
}
;
//# sourceMappingURL=MovementComponent.js.map