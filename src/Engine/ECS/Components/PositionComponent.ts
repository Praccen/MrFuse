class PositionComponent extends Component {
    position: {xy: Vec2, z: number};
    rotation: number;
    scale: {xy: Vec2, z: number};

    constructor(startX?: number, startY?: number, startZ?: number) {
        super(ComponentTypeEnum.POSITION);
        this.position = {xy: new Vec2(startX ?? 0.0, startY ?? 0.0), z: startZ ?? 0.0};
        this.rotation = 0.0;
        this.scale = {xy: new Vec2(1.0, 1.0), z: 1.0};
    }

    calculateMatrix(matrix: Matrix4) {
        matrix.setIdentity();
        matrix.translate(this.position.xy.x, this.position.xy.y, this.position.z);
        matrix.rotate(this.rotation, 0.0, 0.0, 1.0);
        matrix.scale(this.scale.xy.x, this.scale.xy.y, this.scale.z);
    }
};