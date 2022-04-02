class MapSystem extends System {
    getCameraPos: () => { x: number; y: number };
    ecsManager: ECSManager;
    nrTiles: number;
    maxTiles: number;

    constructor(
        getCameraPos: () => { x: number; y: number },
        manager: ECSManager
    ) {
        super([ComponentTypeEnum.MAPTILE, ComponentTypeEnum.POSITION]);
        this.getCameraPos = getCameraPos;
        this.ecsManager = manager;
        this.nrTiles = 0;
        this.maxTiles = 4;

        this.createTile(10.0, 0.0);
    }

    update() {
        const camX = this.ecsManager.camera.getPosition().x;
        for (const e of this.entities) {
            let posComp = <PositionComponent>(
                e.getComponent(ComponentTypeEnum.POSITION)
            );
            let mtComp = <MapTileComponent>(
                e.getComponent(ComponentTypeEnum.MAPTILE)
            );

            if (camX - posComp.position.xy.x > 5.0) {
                //mapTile is at end, change type and move to front
                posComp.position.xy.x = camX + 1.0;
            } else if (camX - posComp.position.xy.x > 2.0 && this.nrTiles < this.maxTiles) {
                //spawn a new mapTile
                this.createTile(camX + 4.0, 0.0);
            }
        }
    }

    createTile(x: number, y: number) {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        gc.quad.texture.loadFromFile(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"
        );
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, new PositionComponent(x, y));
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(2, 1);
        ac.advanceBy = { x: 1, y: 0 };
        ac.modAdvancement = { x: 2, y: 0 };
        ac.updateInterval = 0.5;
        this.ecsManager.addComponent(entity, ac);
        this.ecsManager.addComponent(entity, new MapTileComponent());

        this.nrTiles++;

        return entity;
    }
}
