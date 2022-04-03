class GraphicsSystem extends System {
    constructor(rendering) {
        super([ComponentTypeEnum.GRAPHICS, ComponentTypeEnum.POSITION]);
        this.rendering = rendering;
    }
    update(dt) {
        for (const e of this.entities) {
            let graphComp = e.getComponent(ComponentTypeEnum.GRAPHICS);
            let posComp = e.getComponent(ComponentTypeEnum.POSITION);
            if (graphComp && posComp) {
                posComp.calculateMatrix(graphComp.quad.modelMatrix);
            }
        }
    }
    removeFaultyEntity(entityId) {
        const index = this.entities.findIndex(c => c.id == entityId);
        if (index != -1) {
            if (!this.entityHasCorrectComponents(this.entities[index])) {
                let graphComp = this.entities[index].getComponent(ComponentTypeEnum.GRAPHICS);
                this.rendering.deleteQuad(graphComp.quad);
                this.entities.splice(index, 1);
            }
        }
    }
    removeEntity(entityId) {
        const index = this.entities.findIndex(c => c.id == entityId);
        if (index != -1) {
            let graphComp = this.entities[index].getComponent(ComponentTypeEnum.GRAPHICS);
            this.rendering.deleteQuad(graphComp.quad);
            this.entities.splice(index, 1);
        }
    }
}
;
//# sourceMappingURL=GraphicsSystem.js.map