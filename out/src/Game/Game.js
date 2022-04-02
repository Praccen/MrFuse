class Game {
    constructor(rendering, ecsManager) {
        this.rendering = rendering;
        this.ecsManager = ecsManager;
        this.rendering.camera.setZoom(0.2);
        this.rendering.useCrt = false;
        this.playerEntity = this.createPlayerEntity();
        this.createCollisionEntity(3.5, 0.0);
        this.createCollisionEntity(-4.0, 0.0);
        this.createCollisionEntity(-2.0, 2.0);
        this.createFloor();
        this.createMobile();
    }
    createPlayerEntity() {
        let entity = this.ecsManager.createEntity();
        this.ecsManager.addComponent(entity, new PlayerComponent());
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("Assets/Textures/Character/Character.png");
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent();
        pc.scale.xy = new Vec2(1.0, 1.5);
        this.ecsManager.addComponent(entity, pc);
        this.ecsManager.addComponent(entity, new InputComponent());
        this.ecsManager.addComponent(entity, new MovementComponent());
        this.ecsManager.addComponent(entity, new CameraFocusComponent(this.rendering.camera));
        let cc = new CollisionComponent();
        cc.shape.clearVertices();
        cc.shape.addVertex(new Vec2(-0.3, 0.45));
        cc.shape.addVertex(new Vec2(-0.3, -0.5));
        cc.shape.addVertex(new Vec2(0.3, -0.5));
        cc.shape.addVertex(new Vec2(0.3, 0.45));
        this.ecsManager.addComponent(entity, cc);
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(4, 4);
        ac.startingTile = { x: 0, y: 3 };
        ac.advanceBy = { x: 1.0, y: 0.0 };
        ac.modAdvancement = { x: 2.0, y: 1.0 };
        ac.updateInterval = 0.7;
        this.ecsManager.addComponent(entity, ac);
        return entity;
    }
    createCollisionEntity(xPos, yPos) {
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
    createFloor() {
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
    createMobile() {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.textureMatrix.setScale(0.5, 0.5, 1.0);
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent(0.0, 4.0);
        pc.scale.xy.x = 0.5;
        pc.scale.xy.y = 0.5;
        this.ecsManager.addComponent(entity, pc);
        this.ecsManager.addComponent(entity, new MovementComponent());
        let cc = new CollisionComponent();
        cc.bounce = true;
        this.ecsManager.addComponent(entity, cc);
        return entity;
    }
    update(dt) {
    }
}
//# sourceMappingURL=Game.js.map