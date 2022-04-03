class Game {
    private gl: WebGL2RenderingContext;
    private rendering: Rendering;
    private ecsManager: ECSManager;

    private playerEntity: Entity;
    private bombEntity: Entity;

    private bombStage: number;
    private secondsPerBombStage: number;


    constructor(gl: WebGL2RenderingContext, rendering: Rendering, ecsManager: ECSManager) {
        this.gl = gl;
        this.rendering = rendering;
        this.ecsManager = ecsManager;

        this.rendering.camera.setZoom(0.2);
        this.rendering.useCrt = false;

        this.playerEntity = this.createPlayerEntity();
        this.bombEntity = this.createBomb();

        this.bombStage = 3.0;
        this.secondsPerBombStage = 3.0;
    }

    createPlayerEntity(): Entity {
        let entity = this.ecsManager.createEntity();
        this.ecsManager.addComponent(entity, new PlayerComponent());
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
        ac.spriteMap.setNrOfSprites(4, 4);
        ac.startingTile = {x: 0, y: 3};
        ac.advanceBy = {x: 1.0, y: 0.0};
        ac.modAdvancement = {x: 2.0, y: 1.0};
        ac.updateInterval = 0.7;
        this.ecsManager.addComponent(entity, ac);

        return entity;
    }

    createCollisionEntity(xPos: number, yPos: number): Entity {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("Assets/Textures/Environment/Platform.png");
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
        gc.quad.texture.loadFromFile("Assets/Textures/Environment/Ground.png");
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

    createBomb(): Entity {
        let entity = this.ecsManager.createEntity();
        let gc = new GraphicsComponent(this.rendering.getNewQuad());
        gc.quad.texture.loadFromFile("Assets/Textures/Items/Bomb.png")
        this.ecsManager.addComponent(entity, gc);
        let pc = new PositionComponent(0.0, 4.0);
        this.ecsManager.addComponent(entity, pc);
        let mc = new MovementComponent();
        mc.defaultDrag = 0.4;
        this.ecsManager.addComponent(entity, mc);
        let cc = new CollisionComponent(4.0);
        cc.shape.clearVertices();
        cc.shape.addVertex(new Vec2(-0.4, 0.4));
        cc.shape.addVertex(new Vec2(-0.4, -0.5));
        cc.shape.addVertex(new Vec2(0.4, -0.5));
        cc.shape.addVertex(new Vec2(0.4, 0.4));
        cc.bounce = true;
        this.ecsManager.addComponent(entity, cc);
        let ac = new AnimationComponent();
        ac.spriteMap.setNrOfSprites(3, 3.01); // 3.01 to avoid bomb above in sprite map being slightly visible
        ac.startingTile = {x: 0, y: 1};
        ac.advanceBy = {x: 1.0, y: 0.0};
        ac.modAdvancement = {x: 3.0, y: 1.0};
        ac.updateInterval = 0.05;
        this.ecsManager.addComponent(entity, ac);
        this.ecsManager.addComponent(entity, new BombComponent());
        return entity;
    }
    update(dt: number) {
        this.bombStage -= dt / this.secondsPerBombStage;

        let animComp = <AnimationComponent> this.bombEntity.getComponent(ComponentTypeEnum.ANIMATION);
        if (animComp) {
            animComp.startingTile.y = Math.max(Math.min(Math.floor(this.bombStage), 2), 0);
        }

        if (this.bombStage < 0.0) {
            this.bombStage = 3.0;
        }
    }
}
