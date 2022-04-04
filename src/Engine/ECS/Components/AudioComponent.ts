class AudioComponent extends Component {
    
    playInterval: number;
    timeSinceStarted: number;
    
    constructor() {
        super(ComponentTypeEnum.AUDIO);

        this.playInterval = 0.1;
        this.timeSinceStarted = 0.0;
    }
}
