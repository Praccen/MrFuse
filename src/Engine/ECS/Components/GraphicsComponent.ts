class GraphicsComponent extends Component {
    quad: Quad;

    constructor(quad: Quad) {
        super(ComponentTypeEnum.GRAPHICS);
        this.quad = quad;
    }
};