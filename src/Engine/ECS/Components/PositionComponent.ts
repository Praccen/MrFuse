class PositionComponent extends Component {
    position: Vector3;
    rotation: number;
    scale: Vector3;

    constructor(startX?: number, startY?: number, startZ?: number) {
        super(ComponentTypeEnum.POSITION);
        this.position = new Vector3({x: startX ?? 0.0, y: startY ?? 0.0, z: startZ ?? 0.0});
        this.rotation = 0.0;
        this.scale = new Vector3({x: 1.0, y: 1.0, z: 1.0});
    }

    calculateMatrix(matrix: Matrix4) {
        matrix.setIdentity();
        matrix.translate(this.position[0], this.position[1], this.position[2]);
        matrix.rotate(this.rotation, 0.0, 0.0, 1.0);
        matrix.scale(this.scale[0], this.scale[1], this.scale[2]);
    }
};