class Game {
    constructor(rendering, ecsManager) {
        this.rendering = rendering;
        this.ecsManager = ecsManager;
        this.input = new Input();
        this.rendering.camera.setZoom(0.2);
        this.testEntity = this.createQuadEntity();
        this.createOtherEntity();
        this.createCollisionEntity(3.0, 0.0);
        this.createFloor();
    }
    createQuadEntity() {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png");
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, new PositionComponent());
        this.ecsManager.addComponent(entity, new InputComponent());
        this.ecsManager.addComponent(entity, new MovementComponent());
        this.ecsManager.addComponent(entity, new CameraFocusComponent(this.rendering.camera));
        this.ecsManager.addComponent(entity, new CollisionComponent());
        return entity;
    }
    createOtherEntity() {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png");
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, new PositionComponent());
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(2, 1);
        ac.advanceBy = { x: 1, y: 0 };
        ac.modAdvancement = { x: 2, y: 0 };
        ac.updateInterval = 0.5;
        this.ecsManager.addComponent(entity, ac);
        return entity;
    }
    createCollisionEntity(xPos, yPos) {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        // gc.quad.texture.loadFromFile("https://i.pinimg.com/originals/85/71/d3/8571d3a91bce3b276c2fc90d983e19ec.jpg");
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
        // gc.quad.texture.loadFromFile("https://i.pinimg.com/originals/85/71/d3/8571d3a91bce3b276c2fc90d983e19ec.jpg");
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent(0.0, -1.0);
        pc.scale.xy.x = 10.0;
        this.ecsManager.addComponent(entity, pc);
        let cc = new CollisionComponent();
        cc.isConstraint = true;
        this.ecsManager.addComponent(entity, cc);
        return entity;
    }
    update(dt) {
        // let posComp = <PositionComponent>this.testEntity.getComponent(ComponentTypeEnum.POSITION);
        // if (posComp) {
        //     posComp.position.x = (this.input.mousePosition.x / canvas.clientWidth) * 2.0 - 1.0;
        //     posComp.position.y = ((canvas.clientHeight - this.input.mousePosition.y) / canvas.clientHeight) * 2.0 - 1.0;
        // }
    }
}
//# sourceMappingURL=Game.js.map