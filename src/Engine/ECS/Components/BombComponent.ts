class BombComponent extends Component {
    timer: number;
    maxTime: number;
    exploding: boolean;
    explosionTime: number;
    exploded: boolean;

    constructor() {
        super(ComponentTypeEnum.BOMB);

        this.maxTime = 10.0;
        this.timer = this.maxTime;
        this.exploded = false;
        this.exploding = false;
        this.explosionTime = 1.0;
    }
}