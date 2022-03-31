class GraphicsSystem extends System {

    constructor() {
        super([ComponentTypeEnum.GRAPHICS, ComponentTypeEnum.POSITION]);

    }

    update(dt: number) {
        for (const e of this.entities) {
            let graphComp = <GraphicsComponent> e.getComponent(ComponentTypeEnum.GRAPHICS);
            let posComp = <PositionComponent> e.getComponent(ComponentTypeEnum.POSITION);

            posComp.calculateMatrix(graphComp.quad.modelMatrix);
        }
    }
};