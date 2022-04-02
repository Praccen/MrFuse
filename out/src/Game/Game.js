class Game {
    constructor(rendering, ecsManager) {
        this.rendering = rendering;
        this.ecsManager = ecsManager;
        this.input = new Input();
        this.rendering.camera.setZoom(0.5);
        this.testEntity = this.createQuadEntity();
        this.createOtherEntity();
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
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(2, 1);
        ac.advanceBy = { x: 1, y: 0 };
        ac.modAdvancement = { x: 2, y: 0 };
        ac.updateInterval = 0.5;
        this.ecsManager.addComponent(entity, ac);
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
    update(dt) {
        // let posComp = <PositionComponent>this.testEntity.getComponent(ComponentTypeEnum.POSITION);
        // if (posComp) {
        //     posComp.position.x = (this.input.mousePosition.x / canvas.clientWidth) * 2.0 - 1.0;
        //     posComp.position.y = ((canvas.clientHeight - this.input.mousePosition.y) / canvas.clientHeight) * 2.0 - 1.0;
        // }
    }
}
//# sourceMappingURL=Game.js.map