class PositionComponent extends Component {
    constructor(startX, startY, startZ) {
        super(ComponentTypeEnum.POSITION);
        this.position = new Vector3({ x: startX !== null && startX !== void 0 ? startX : 0.0, y: startY !== null && startY !== void 0 ? startY : 0.0, z: startZ !== null && startZ !== void 0 ? startZ : 0.0 });
        this.rotation = 0.0;
        this.scale = new Vector3({ x: 1.0, y: 1.0, z: 1.0 });
    }
    calculateMatrix(matrix) {
        matrix.setIdentity();
        matrix.translate(this.position[0], this.position[1], this.position[2]);
        matrix.rotate(this.rotation, 0.0, 0.0, 1.0);
        matrix.scale(this.scale[0], this.scale[1], this.scale[2]);
    }
}
;
//# sourceMappingURL=PositionComponent.js.map