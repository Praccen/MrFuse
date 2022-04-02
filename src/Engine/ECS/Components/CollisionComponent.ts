class CollisionComponent extends Component {
    shape: Shape;
    currentCollisionEntities: Array<Entity>;
    isConstraint: boolean;
    effectMovement: boolean;
	allowedClimbing: number;

    constructor() {
        super(ComponentTypeEnum.COLLISION);

        this.currentCollisionEntities = new Array<Entity>();
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
};