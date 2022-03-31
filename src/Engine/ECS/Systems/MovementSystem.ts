class MovementSystem extends System {

    constructor() {
        super([ComponentTypeEnum.POSITION, ComponentTypeEnum.MOVEMENT]);

    }

    update(dt: number) {
        for (const e of this.entities) {
            let posComp = <PositionComponent> e.getComponent(ComponentTypeEnum.POSITION);
            let movComp = <MovementComponent> e.getComponent(ComponentTypeEnum.MOVEMENT);
            
            // Do movement calculations and set positions accordingly
        }
    }

};