class ECSManager {
    constructor() {
        this.systems = new Map();
        this.entityCounter = 0;
        this.entities = new Array();
        this.entityAdditionQueue = new Array();
        this.entityDeletionQueue = new Array();
        this.componentAdditionQueue = new Array();
        this.componentRemovalQueue = new Array();
        this.initializeSystems();
    }
    initializeSystems() {
        this.systems.set("GRAPHICS", new GraphicsSystem());
    }
    update(dt) {
        // Add new entities
        this.addQueuedEntities();
        // For all entities, remove/add components
        // Remove/add entities from systems
        this.addQueuedComponents();
        this.removeComponents();
        this.removeEntitiesMarkedForDeletion();
        this.systems.get("GRAPHICS").update(dt);
    }
    updateRenderingSystems() {
    }
    createEntity() {
        const length = this.entityAdditionQueue.push(new Entity(this.entityCounter++));
        return this.entityAdditionQueue[length - 1];
    }
    addComponent(entity, component) {
        this.componentAdditionQueue.push({ entity, component });
    }
    removeEntity(entityID) {
        this.entityDeletionQueue.push(entityID);
    }
    removeComponent(entity, component) {
        this.componentRemovalQueue.push({ entity, component });
    }
    getEntity(entityID) {
        for (const entity of this.entities) {
            if (entity.id == entityID) {
                return entity;
            }
        }
        return null;
    }
    // Private
    addQueuedEntities() {
        for (const newEntity of this.entityAdditionQueue) {
            // Add to manager
            const length = this.entities.push(newEntity);
            // Add to systems
            for (let system of this.systems) {
                system[1].addEntity(this.entities[length - 1]);
            }
        }
        // Empty queue
        this.entityAdditionQueue.splice(0, this.entityAdditionQueue.length);
    }
    addQueuedComponents() {
        for (const compEntityPair of this.componentAdditionQueue) {
            // If enitity does not already have component, proceed
            if (compEntityPair.entity.addComponent(compEntityPair.component)) {
                for (let system of this.systems) {
                    // If entity is not already belonging to the system, try and add it
                    if (!system[1].containsEntity(compEntityPair.entity.id)) {
                        system[1].addEntity(compEntityPair.entity);
                    }
                }
            }
        }
        // Empty queue
        this.componentAdditionQueue.splice(0, this.componentAdditionQueue.length);
    }
    removeEntitiesMarkedForDeletion() {
        for (let i of this.entityDeletionQueue) {
            // Delete in systems
            for (let system of this.systems) {
                system[1].removeEntity(i);
            }
            // Delete in manager
            let index = this.entities.findIndex(c => c.id == this.entityDeletionQueue[i]);
            if (index != -1) {
                this.entities.splice(index, 1);
            }
        }
        // Empty queue
        this.entityDeletionQueue.splice(0, this.entityDeletionQueue.length);
    }
    removeComponents() {
        for (const compEntityPair of this.componentRemovalQueue) {
            // Remove component from entity
            compEntityPair.entity.removeComponent(compEntityPair.component.type);
            // Remove entity from system if it no longer lives up to the requirements of being in the system
            for (let system of this.systems) {
                system[1].removeFaultyEntity(compEntityPair.entity.id);
            }
        }
        // Empty queue
        this.componentRemovalQueue.splice(0, this.componentRemovalQueue.length);
    }
}
;
//# sourceMappingURL=ECSManager.js.map