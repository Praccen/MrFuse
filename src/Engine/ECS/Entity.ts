class Entity {
    public readonly id: number;
    private name: string;
    private components: Array<Component>;

    constructor(id: number) {
        this.id = id;
        this.components = new Array<Component>();
    }

    addComponent(component: Component): boolean {
        if (!this.hasComponent(component.type)) {
            this.components.push(component);
            return true;
        }
        return false;
    }

    hasComponent(type: ComponentTypeEnum): boolean {
        return (this.components.some(c => c.type == type));
    }

    removeComponent(type: ComponentTypeEnum) {
        let index = this.components.findIndex(c => c.type == type);
        if (index != -1) {
            this.components.splice(index, 1);
        }
    }

    getComponent(type: ComponentTypeEnum): Component {
        return this.components.find(c => c.type == type);
    }
};