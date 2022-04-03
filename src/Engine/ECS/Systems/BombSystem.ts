class BombSystem extends System {
    constructor() {
        super([ComponentTypeEnum.BOMB, ComponentTypeEnum.COLLISION]);
    }

    update(dt: number) {
        for(let entity of this.entities) {

            let b = <BombComponent>entity.getComponent(ComponentTypeEnum.BOMB);
            if(b.exploded) continue;
            let c = <CollisionComponent>entity.getComponent(ComponentTypeEnum.COLLISION);

            c.currentCollisionEntities.forEach((ce) => {
                if(ce.hasComponent(ComponentTypeEnum.PLAYER)){
                    console.log("Time increased");
                    b.timer = b.timer + 1 < b.maxTime ? b.timer + 1 : b.maxTime;
                }
            })

            b.timer -= dt;

            if(b.timer < 0.0) {
                console.log("EXPLODE!");
                b.exploded = true;
            }
        }
    }
}