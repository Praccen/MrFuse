class CameraFocusComponent extends Component{
  offset: {x: number, y: number};
  camera: Camera;

  constructor(camera) {
    super(ComponentTypeEnum.CAMERAFOCUS);
    this.offset = {x: 0.0, y: 0.0};
    this.camera = camera;
  }
}