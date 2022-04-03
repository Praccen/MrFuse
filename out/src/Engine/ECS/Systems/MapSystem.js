const mapSrc = `
1000000000001
1000003300001
1000030000001
1000000000001
1300000033001
1003000000001
2222222222222`;
const section = {
    1: [-2, 10],
    2: [-1, 0, 8, 9],
    3: [2, 3, 5, 6],
    4: [4],
};
class MapSystem extends System {
    constructor(getCameraPos, manager) {
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
        if (camTopDistance < 3.0) {
            this.mapHeight++;
            //walls
            this.createTile(-2, this.mapHeight, 1);
            this.createTile(this.mapWidth, this.mapHeight, 1);
            if (this.nextSection == 1) {
                let rand = Math.floor(Math.random() * section['3'].length);
                this.createTile(section['3'][rand], this.mapHeight, 3);
                this.createTile(section['3'][rand] + 1, this.mapHeight, 3);
                this.nextSection = 4;
            }
            else if (this.nextSection == 2) {
                let rand = Math.floor(Math.random() * section['4'].length);
                this.createTile(section['4'][rand], this.mapHeight, 3);
                this.createTile(section['4'][rand] + 1, this.mapHeight, 3);
                this.nextSection = 3;
            }
            else if (this.nextSection == 3) {
                let rand = Math.floor(Math.random() * section['1'].length);
                this.createTile(section['1'][rand], this.mapHeight, 3);
                this.nextSection = 1;
            }
            else if (this.nextSection == 4) {
                const rand = Math.floor(Math.random() * section['2'].length);
                this.createTile(section['2'][rand], this.mapHeight, 3);
                this.createTile(section['2'][rand] + 1, this.mapHeight, 3);
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
                this.mapWidth = x - 1;
                y++;
                x = -3;
            }
            else if (mapSrc.charAt(i) != '0') {
                this.createTile(x, y, parseInt(mapSrc.charAt(i), 10));
            }
        }
        this.mapHeight = y - 1;
    }
    createTile(x, y, type) {
        this.nrTiles++;
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.ecsManager.rendering.getNewQuad());
        let pc = new PositionComponent(x, y);
        if (type == 1) {
            gc.quad.texture.loadFromFile("Assets/Textures/Environment/Platform.png");
        }
        else if (type == 2) {
            gc.quad.texture.loadFromFile("Assets/Textures/Environment/Ground.png");
        }
        else if (type == 3) {
            gc.quad.texture.loadFromFile("Assets/Textures/Environment/Platform.png");
            pc.scale.xy.y = 0.5;
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
//# sourceMappingURL=MapSystem.js.map