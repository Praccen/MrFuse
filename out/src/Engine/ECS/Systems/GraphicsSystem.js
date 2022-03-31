class GraphicsSystem extends System {
    constructor() {
        super([ComponentTypeEnum.GRAPHICS, ComponentTypeEnum.POSITION]);
    }
    update(dt) {
        for (const e of this.entities) {
            let graphComp = e.getComponent(ComponentTypeEnum.GRAPHICS);
            let posComp = e.getComponent(ComponentTypeEnum.POSITION);
            posComp.calculateMatrix(graphComp.quad.modelMatrix);
        }
    }
}
;
//# sourceMappingURL=GraphicsSystem.js.map