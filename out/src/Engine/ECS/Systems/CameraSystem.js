class CameraSystem extends System {
    constructor() {
        super([ComponentTypeEnum.CAMERAFOCUS, ComponentTypeEnum.POSITION]);
    }
    update(dt) {
        for (const e of this.entities) {
            let camComp = (e.getComponent(ComponentTypeEnum.CAMERAFOCUS));
            let posComp = (e.getComponent(ComponentTypeEnum.POSITION));
            camComp.camera.setPosition(posComp.position.xy.x + camComp.offset.x, posComp.position.xy.y + camComp.offset.y);
        }
    }
}
//# sourceMappingURL=CameraSystem.js.map