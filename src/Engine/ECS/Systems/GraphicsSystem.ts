class GraphicsSystem extends System {
    private rendering: Rendering;
    
    constructor(rendering: Rendering) {
        super([ComponentTypeEnum.GRAPHICS, ComponentTypeEnum.POSITION]);
        this.rendering = rendering;
    }

    update(dt: number) {
        for (const e of this.entities) {
            let graphComp = <GraphicsComponent> e.getComponent(ComponentTypeEnum.GRAPHICS);
            let posComp = <PositionComponent> e.getComponent(ComponentTypeEnum.POSITION);

            if (graphComp && posComp) {
                posComp.calculateMatrix(graphComp.quad.modelMatrix);
            }
        }
    }

    removeEntity(entityId: number) {
        const index = this.entities.findIndex(c => c.id == entityId);

        if (index != -1) {
            let graphComp = <GraphicsComponent> this.entities[index].getComponent(ComponentTypeEnum.GRAPHICS);
            this.rendering.deleteQuad(graphComp.quad);

            this.entities.splice(index, 1);
        }
    }
};