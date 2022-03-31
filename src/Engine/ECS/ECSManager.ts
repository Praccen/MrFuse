class ECSManager {
    private systems: Map<String, System>;
    private entityCounter: number;

    constructor() {
        this.entityCounter = 0;
    }

    initializeSystems() {
        this.systems.set("GRAPHICS", new GraphicsSystem());
    }

    update(dt: number) {
        this.systems.get("GRAPHICS").update(dt);
    }

    updateRenderingSystems() {

    }

    createEntity(): Entity {
        return new Entity(this.entityCounter++);
    }
};