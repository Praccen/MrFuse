class PositionComponent extends Component {
    position: {x: number, y: number, z: number};
    rotation: number;
    scale: {x: number, y: number, z: number};

    constructor(startX?: number, startY?: number, startZ?: number) {
        super(ComponentTypeEnum.POSITION);
        this.position = {x: startX ?? 0.0, y: startY ?? 0.0, z: startZ ?? 0.0};
        this.rotation = 0.0;
        this.scale = {x: 1.0, y: 1.0, z: 1.0};
    }

    calculateMatrix(matrix: Matrix4) {
        matrix.setIdentity();
        matrix.translate(this.position.x, this.position.y, this.position.z);
        matrix.rotate(this.rotation, 0.0, 0.0, 1.0);
        matrix.scale(this.scale.x, this.scale.y, this.scale.z);
    }
};