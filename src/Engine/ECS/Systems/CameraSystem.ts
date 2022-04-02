class CameraSystem extends System {
  constructor() {
    super([ComponentTypeEnum.CAMERAFOCUS, ComponentTypeEnum.POSITION]);
  }

  update(dt: number) {
    for (const e of this.entities) {
      let camComp = <CameraFocusComponent>(
        e.getComponent(ComponentTypeEnum.CAMERAFOCUS)
      );
      let posComp = <PositionComponent>(
        e.getComponent(ComponentTypeEnum.POSITION)
      );

      camComp.camera.setPosition(
        posComp.position.xy.x + camComp.offset.x,
        posComp.position.xy.y + camComp.offset.y
      );
    }
  }
}
