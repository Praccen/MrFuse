class AnimationComponent extends Component {
    startingTile: {x: number, y: number};
    advanceBy: {x: number, y: number};
    modAdvancement: {x: number, y:number};
    updateInterval: number;
    updateTimer: number;
    advancements: number;

    spriteMap: SpriteMap;

    constructor() {
        super(ComponentTypeEnum.ANIMATION);
        this.startingTile = {x: 0, y: 0};
        this.advanceBy = {x: 0, y: 0};
        this.modAdvancement = {x: 1, y: 1};
        this.updateInterval = 1.0;
        this.updateTimer = 0.0;
        this.advancements = 0;

        this.spriteMap = new SpriteMap();
    }
};