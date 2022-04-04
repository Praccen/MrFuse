const mapSrc = `
000000000000
000000000022
005555550000
000000003000
000000000400
000000000002
003000000052
003000004442
000550000000
000000000000
000000003000
000505033222
000000000000
300000000000
222222200000
000000000022
000000002022
000002222222
050000000022
033300000000
000044500000
000000000000
000000000333
000000330322
000003223222`;

const section = {
    1: [-2, 9],
    2: [-1, 0, 7, 8],
    3: [2,3,5,6],
    4: [4],
}

const textureDictionary = {
    1: "Assets/Textures/Environment/Ground.png",
    2: "Assets/Textures/Environment/CobbleBricks.png",
    3: "Assets/Textures/Environment/Platform.png",
    4: "Assets/Textures/Environment/Platform.png",
    5: "Assets/Textures/Environment/Platform.png",
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
        // const camPos = this.ecsManager.camera.getPosition();

        // //if player has gotten this far up, its time to spawn a new row
        // const camTopDistance = this.mapHeight - camPos.y;
        // if(camTopDistance < 3.0) {
        //     this.mapHeight++;
        //     //walls
        //     this.createTile(-2, this.mapHeight, 1.0, 1.0, 4);
        //     this.createTile(this.mapWidth, this.mapHeight, 1.0, 1.0, 4);


        //     if(this.nextSection == 1) {
        //         let rand = Math.floor(Math.random()*section['3'].length);
        //         this.createTile(section['3'][rand], this.mapHeight, 1.0, 1.0, 3);
        //         this.createTile(section['3'][rand]+1, this.mapHeight, 1.0, 1.0, 3);
        //         this.nextSection = 4;
        //     } 
        //     else if(this.nextSection == 2) {
        //         let rand = Math.floor(Math.random()*section['4'].length);
        //         this.createTile(section['4'][rand], this.mapHeight, 1.0, 1.0, 3);
        //         this.createTile(section['4'][rand]+1, this.mapHeight, 1.0, 1.0, 3);
        //         this.nextSection = 3;
        //     }
        //     else if(this.nextSection == 3) {
        //         let rand = Math.floor(Math.random()*section['1'].length);
        //         this.createTile(section['1'][rand], this.mapHeight, 1.0, 1.0, 3);
        //         this.nextSection = 1;
        //     }
        //     else if(this.nextSection == 4){
        //         const rand = Math.floor(Math.random()*section['2'].length);
        //         this.createTile(section['2'][rand], this.mapHeight, 1.0, 1.0, 3);
        //         this.createTile(section['2'][rand]+1, this.mapHeight, 1.0, 1.0, 3);
        //         this.nextSection = 2;
        //     }

        // }
    }

    populateMap() {
        let y = 0;
        let x = 0;

        // Find width and height
        for (let i = mapSrc.length - 1; i >= 0; i--) {
            x++;
            if (mapSrc.charAt(i) == '\n') {
                this.mapWidth = Math.max(x - 1, this.mapWidth);
                y++;
                x = 0;
            }
        }
        this.mapHeight = y;

        // Actually place tiles
        y = this.mapHeight;
        x = 0;
        for (let i = 0; i < mapSrc.length; i++) {
            x++;
            if (mapSrc.charAt(i) == '\n') {
                y--;
                x = 0;
            }
            else if (mapSrc.charAt(i) != '0' && mapSrc.charAt(i) != ' ') {
                this.createTile(x, y, 1.0, 1.0, parseInt(mapSrc.charAt(i),10));
            }
        }

        // Create floor 
        const floorWitdth = this.mapWidth + 20.0 
        this.createTile(this.mapWidth / 2.0 + 0.5, -1.0, floorWitdth + 2, 1.0, 1);
        
        // And walls
        this.createTile(0.0, this.mapHeight / 2 - 0.5, 1.0, this.mapHeight, 2);
        this.createTile(this.mapWidth + 1 , this.mapHeight / 2.0 - 0.5, 1.0, this.mapHeight, 2);

        // And back wall
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        let pc = new PositionComponent();
        pc.position.xy.x = this.mapWidth / 2.0 + 0.5;
        pc.position.xy.y = this.mapHeight / 2.0 - 0.5;
        pc.position.z = 0.5;
        pc.scale.xy.x = this.mapWidth + 0.5;
        pc.scale.xy.y = this.mapHeight;
        gc.quad.texture.loadFromFile("Assets/Textures/Environment/WallPlanks.png");
        gc.quad.textureMatrix.setScale(this.mapWidth + 0.5, this.mapHeight, 1.0);
        this.ecsManager.addComponent(entity, gc);
        this.ecsManager.addComponent(entity, pc);
    }

    createTile(x: number, y: number, width: number, height: number, type: number) {
 
        this.nrTiles++;

        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        let pc = new PositionComponent(x, y);
        gc.quad.texture.loadFromFile(textureDictionary[type]);

        pc.scale.xy.x = width;
        pc.scale.xy.y = height;
        if( type == 4) {
            pc.position.xy.y += 0.25;
            pc.scale.xy.y *= 0.5;
            gc.quad.textureMatrix.setScale(width, height * 0.5, 1.0);
        } 
        else if (type == 5) {
            pc.position.xy.y -= 0.25;
            pc.scale.xy.y *= 0.5;
            gc.quad.textureMatrix.setScale(width, height * 0.5, 1.0);
        }
        else {
            gc.quad.textureMatrix.setScale(width, height, 1.0);
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
