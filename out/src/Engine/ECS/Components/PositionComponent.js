class PositionComponent extends Component {
    constructor(startX, startY, startZ) {
        super(ComponentTypeEnum.POSITION);
        this.position = { xy: new Vec2(startX !== null && startX !== void 0 ? startX : 0.0, startY !== null && startY !== void 0 ? startY : 0.0), z: startZ !== null && startZ !== void 0 ? startZ : 0.0 };
        this.rotation = 0.0;
        this.scale = { xy: new Vec2(1.0, 1.0), z: 1.0 };
    }
    calculateMatrix(matrix) {
        matrix.setIdentity();
        matrix.translate(this.position.xy.x, this.position.xy.y, this.position.z);
        matrix.rotate(this.rotation, 0.0, 0.0, 1.0);
        matrix.scale(this.scale.xy.x, this.scale.xy.y, this.scale.z);
    }
}
;
//# sourceMappingURL=PositionComponent.js.map