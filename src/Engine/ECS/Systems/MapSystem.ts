const mapSrc = `
1000000000001
1100000000001
1000010000001
1000111000001
1100000000011
1110000001001
2222222222222`;

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

        this.populateMap();
    }

    update() {
        const camX = this.ecsManager.camera.getPosition().x;
        // for (const e of this.entities) {
        //     let posComp = <PositionComponent>(
        //         e.getComponent(ComponentTypeEnum.POSITION)
        //     );
        //     let mtComp = <MapTileComponent>(
        //         e.getComponent(ComponentTypeEnum.MAPTILE)
        //     );

        //     if (camX - posComp.position.xy.x > 5.0) {
        //         //mapTile is at end, change type and move to front
        //         posComp.position.xy.x = camX + 1.0;
        //     } else if (camX - posComp.position.xy.x > 2.0 && this.nrTiles < this.maxTiles) {
        //         //spawn a new mapTile
        //         this.createTile(camX + 4.0, 0.0);
        //     }
        // }
    }

    populateMap() {
        let y = -1;
        let x = -3;
        for (let i = mapSrc.length - 1; i >= 0; i--) {
            x++;
            if (mapSrc.charAt(i) == '\n') {
                y++;
                x = -3;
            }
            else if (mapSrc.charAt(i) != '0') {
                this.createTile(x, y, parseInt(mapSrc.charAt(i),10));
            }
        }
    }

    createTile(x: number, y: number, type: number) {
        // let entity = this.ecsManager.createEntity();
        // let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        // gc.quad.texture.loadFromFile(
        //     "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"
        // );
        // this.ecsManager.addComponent(entity, gc);
        // this.ecsManager.addComponent(entity, new PositionComponent(x, y));
        // let ac = new AnimationComponent();
        // ac.spriteMap.setNrOfSprites(2, 1);
        // ac.advanceBy = { x: 1, y: 0 };
        // ac.modAdvancement = { x: 2, y: 0 };
        // ac.updateInterval = 0.5;
        // this.ecsManager.addComponent(entity, ac);
        // this.ecsManager.addComponent(entity, new MapTileComponent());

        this.nrTiles++;

        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        if (type == 1) {
            gc.quad.texture.loadFromFile("Assets/Textures/Environment/Platform.png");
        } 
        else if (type == 2) {
            gc.quad.texture.loadFromFile("Assets/Textures/Environment/Ground.png");
        }
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, new PositionComponent(x, y));
        let cc = new CollisionComponent();
        cc.isConstraint = true;
        this.ecsManager.addComponent(entity, new MapTileComponent());
        this.ecsManager.addComponent(entity, cc);
        return entity;


        // return entity;
    }
}
