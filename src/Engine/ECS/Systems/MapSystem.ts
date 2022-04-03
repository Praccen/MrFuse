const mapSrc = `
4000000000004
4000003300004
4000030000004
4000000000004
4300000033004
4003000000004
2222222222222`;

const section = {
    1: [-2, 9],
    2: [-1, 0, 7, 8],
    3: [2,3,5,6],
    4: [4],
}

const textureDictionary = {
    1: "Assets/Textures/Environment/Platform.png",
    2: "Assets/Textures/Environment/Ground.png",
    3: "Assets/Textures/Environment/Platform.png",
    4: "Assets/Textures/Environment/CobbleBricks.png",
}

class MapSystem extends System {
    getCameraPos: () => { x: number; y: number };
    ecsManager: ECSManager;
    nrTiles: number;
    maxTiles: number;

    mapHeight: number;
    mapWidth: number;
    nextSection: number;

    constructor(
        getCameraPos: () => { x: number; y: number },
        manager: ECSManager
    ) {
        super([ComponentTypeEnum.MAPTILE, ComponentTypeEnum.POSITION]);
        this.getCameraPos = getCameraPos;
        this.ecsManager = manager;
        this.nrTiles = 0;
        this.maxTiles = 4;
        this.mapHeight = 0;
        this.mapWidth = 0;
        this.nextSection = 1;

        this.populateMap();
    }

    update() {
        const camPos = this.ecsManager.camera.getPosition();

        //if player has gotten this far up, its time to spawn a new row
        const camTopDistance = this.mapHeight - camPos.y;
        if(camTopDistance < 3.0) {
            this.mapHeight++;
            //walls
            this.createTile(-2, this.mapHeight, 4);
            this.createTile(this.mapWidth, this.mapHeight, 4);


            if(this.nextSection == 1) {
                let rand = Math.floor(Math.random()*section['3'].length);
                this.createTile(section['3'][rand], this.mapHeight, 3);
                this.createTile(section['3'][rand]+1, this.mapHeight, 3);
                this.nextSection = 4;
            } 
            else if(this.nextSection == 2) {
                let rand = Math.floor(Math.random()*section['4'].length);
                this.createTile(section['4'][rand], this.mapHeight, 3);
                this.createTile(section['4'][rand]+1, this.mapHeight, 3);
                this.nextSection = 3;
            }
            else if(this.nextSection == 3) {
                let rand = Math.floor(Math.random()*section['1'].length);
                this.createTile(section['1'][rand], this.mapHeight, 3);
                this.nextSection = 1;
            }
            else if(this.nextSection == 4){
                const rand = Math.floor(Math.random()*section['2'].length);
                this.createTile(section['2'][rand], this.mapHeight, 3);
                this.createTile(section['2'][rand]+1, this.mapHeight, 3);
                this.nextSection = 2;
            }
        }
    }

    populateMap() {
        let y = -1;
        let x = -3;
        for (let i = mapSrc.length - 1; i >= 0; i--) {
            x++;
            if (mapSrc.charAt(i) == '\n') {
                this.mapWidth = x-1;
                y++;
                x = -3;
            }
            else if (mapSrc.charAt(i) != '0') {
                this.createTile(x, y, parseInt(mapSrc.charAt(i),10));
            }
        }
        this.mapHeight = y-1;
    }

    createTile(x: number, y: number, type: number) {
 
        this.nrTiles++;

        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        let pc = new PositionComponent(x, y);
        gc.quad.texture.loadFromFile(textureDictionary[type]);
        if(type == 3) {
            pc.scale.xy.y = 0.5;
            gc.quad.textureMatrix.setScale(1.0, 0.5, 1.0);
        }
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, pc);
        let cc = new CollisionComponent();
        cc.isConstraint = true;
        this.ecsManager.addComponent(entity, new MapTileComponent());
        this.ecsManager.addComponent(entity, cc);
        return entity;
    }
}
