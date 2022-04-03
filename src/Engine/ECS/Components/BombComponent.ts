class BombComponent extends Component {
    timer: number;
    maxTime: number;
    exploded: boolean;

    constructor() {
        super(ComponentTypeEnum.BOMB);

        this.maxTime = 10.0;
        this.timer = this.maxTime;
        this.exploded = false;
    }
}