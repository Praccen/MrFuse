class BombSystem extends System {
    constructor() {
        super([ComponentTypeEnum.BOMB, ComponentTypeEnum.COLLISION]);
    }
    update(dt) {
        for (let entity of this.entities) {
            let b = entity.getComponent(ComponentTypeEnum.BOMB);
            if (b.exploded)
                continue;
            let c = entity.getComponent(ComponentTypeEnum.COLLISION);
            c.currentCollisionEntities.forEach((ce) => {
                if (ce.hasComponent(ComponentTypeEnum.PLAYER)) {
                    console.log("Time increased");
                    b.timer = b.timer + 1 < b.maxTime ? b.timer + 1 : b.maxTime;
                }
            });
            b.timer -= dt;
            if (b.timer < 0.0) {
                console.log("EXPLODE!");
                b.exploded = true;
            }
        }
    }
}
//# sourceMappingURL=BombSystem.js.map