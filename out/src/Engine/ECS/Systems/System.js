class System {
    constructor(componentTypes) {
        this.requiredComponents = componentTypes;
        this.entities = new Array();
    }
    entityHasCorrectComponents(entity) {
        for (const type of this.requiredComponents) {
            if (!entity.hasComponent(type)) {
                return false;
            }
        }
        return true;
    }
    addEntity(entity) {
        if (this.entityHasCorrectComponents(entity)) {
            this.entities.push(entity);
            return true;
        }
        return false;
    }
    containsEntity(entityId) {
        return this.entities.some(c => c.id == entityId);
    }
    removeFaultyEntity(entityId) {
        const index = this.entities.findIndex(c => c.id == entityId);
        if (index != -1) {
            if (!this.entityHasCorrectComponents(this.entities[index])) {
                this.entities.splice(index, 1);
            }
        }
    }
    removeEntity(entityId) {
        const index = this.entities.findIndex(c => c.id == entityId);
        if (index != -1) {
            this.entities.splice(index, 1);
        }
    }
    update(dt) {
    }
}
;
//# sourceMappingURL=System.js.map