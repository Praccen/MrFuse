class AnimationComponent extends Component {
    constructor() {
        super(ComponentTypeEnum.ANIMATION);
        this.startingTile = { x: 0, y: 0 };
        this.advanceBy = { x: 0, y: 0 };
        this.modAdvancement = { x: 1, y: 1 };
        this.updateInterval = 1.0;
        this.updateTimer = 0.0;
        this.advancements = 0;
        this.spriteMap = new SpriteMap();
    }
}
;
//# sourceMappingURL=AnimationComponent.js.map