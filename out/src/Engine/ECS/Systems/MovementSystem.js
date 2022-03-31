class MovementSystem extends System {
    constructor() {
        super([ComponentTypeEnum.POSITION, ComponentTypeEnum.MOVEMENT]);
    }
    update(dt) {
        for (const e of this.entities) {
            let posComp = e.getComponent(ComponentTypeEnum.POSITION);
            let movComp = e.getComponent(ComponentTypeEnum.MOVEMENT);
            // Do movement calculations and set positions accordingly
        }
    }
}
;
//# sourceMappingURL=MovementSystem.js.map