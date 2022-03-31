class Entity {
    constructor(id) {
        this._id = id;
        this.components = new Array();
    }
    get id() {
        return this.id;
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
    removeComponent(type) {
        let index = this.components.findIndex(c => c.type == type);
        if (index != -1) {
            this.components.splice(index, 1);
        }
    }
    getComponent(type) {
        return this.components.find(c => c.type == type);
    }
}
;
//# sourceMappingURL=Entity.js.map