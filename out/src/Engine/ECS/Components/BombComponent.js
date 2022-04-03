class BombComponent extends Component {
    constructor() {
        super(ComponentTypeEnum.BOMB);
        this.maxTime = 10.0;
        this.timer = this.maxTime;
        this.exploded = false;
        this.exploding = false;
        this.explosionTime = 1.0;
    }
}
//# sourceMappingURL=BombComponent.js.map