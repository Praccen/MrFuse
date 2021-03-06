class Entity {
    constructor(id) {
        this.id = id;
        this.components = new Array();
    }
    addComponent(component) {
        if (!this.hasComponent(component.type)) {
            this.components.push(component);
            return true;
        }
        return false;
    }
    hasComponent(type) {
        return (this.components.some(c => c.type == type));
    }
    removeComponent(type, rendering) {
        let index = this.components.findIndex(c => c.type == type);
        if (index != -1) {
            if (type == ComponentTypeEnum.GRAPHICS) {
                rendering.deleteQuad(this.components[index].quad);
            }
            this.components.splice(index, 1);
        }
    }
    getComponent(type) {
        return this.components.find(c => c.type == type);
    }
}
;
//# sourceMappingURL=Entity.js.map