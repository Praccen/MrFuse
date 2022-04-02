class CollisionComponent extends Component {
    constructor() {
        super(ComponentTypeEnum.COLLISION);
        this.currentCollisionEntities = new Array();
        this.isConstraint = false;
        this.effectMovement = true;
        this.allowedClimbing = 0.0;
        this.shape = new Shape();
        this.shape.addNormal(new Vec2(1.0, 0.0));
        this.shape.addNormal(new Vec2(0.0, 1.0));
        this.shape.addVertex(new Vec2(-0.5, 0.5));
        this.shape.addVertex(new Vec2(-0.5, -0.5));
        this.shape.addVertex(new Vec2(0.5, -0.5));
        this.shape.addVertex(new Vec2(0.5, 0.5));
    }
}
;
//# sourceMappingURL=CollisionComponent.js.map