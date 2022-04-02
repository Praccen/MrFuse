class Game {
    private rendering: Rendering;
    private ecsManager: ECSManager;

    private playerEntity: Entity;

    constructor(rendering: Rendering, ecsManager: ECSManager) {
        this.rendering = rendering;
        this.ecsManager = ecsManager;

        this.rendering.camera.setZoom(0.2);
        this.rendering.useCrt = false;

        this.playerEntity = this.createPlayerEntity();
        this.createCollisionEntity(3.5, 0.0);
        this.createCollisionEntity(-4.0, 0.0);
        this.createCollisionEntity(-2.0, 2.0);
        this.createFloor();
    }

    createPlayerEntity(): Entity {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile(
            "Assets/Textures/Character/Character.png"
        );
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent();
        pc.scale.xy = new Vec2(1.0, 1.5);
        this.ecsManager.addComponent(entity, pc);
        this.ecsManager.addComponent(entity, new InputComponent());
        this.ecsManager.addComponent(entity, new MovementComponent());
        this.ecsManager.addComponent(
            entity,
            new CameraFocusComponent(this.rendering.camera)
        );
        let cc = new CollisionComponent();
        cc.shape.clearVertices();
        cc.shape.addVertex(new Vec2(-0.3, 0.45));
        cc.shape.addVertex(new Vec2(-0.3, -0.5));
        cc.shape.addVertex(new Vec2(0.3, -0.5));
        cc.shape.addVertex(new Vec2(0.3, 0.45));
        this.ecsManager.addComponent(entity, cc);
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(2, 2);
        ac.startingTile = {x: 0, y: 1};
        ac.advanceBy = {x: 1.0, y: 0.0};
        ac.modAdvancement = {x: 2.0, y: 1.0};
        ac.updateInterval = 0.7;
        this.ecsManager.addComponent(entity, ac);

        return entity;
    }

    createCollisionEntity(xPos: number, yPos: number): Entity {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("Assets/Textures/Buttons/Button.png");
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, new PositionComponent(xPos, yPos));
        let cc = new CollisionComponent();
        cc.isConstraint = true;
        this.ecsManager.addComponent(entity, cc);
        return entity;
    }

    createFloor(): Entity {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.textureMatrix.setScale(10.0, 1.0, 1.0);
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent(0.0, -1.0);
        pc.scale.xy.x = 10.0;
        this.ecsManager.addComponent(entity, pc);
        let cc = new CollisionComponent();
        cc.isConstraint = true;
        this.ecsManager.addComponent(entity, cc);
        return entity;
    }

    update(dt: number) {

    }
}
