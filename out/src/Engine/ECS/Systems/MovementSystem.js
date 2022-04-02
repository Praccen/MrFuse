class MovementSystem extends System {
    constructor() {
        super([ComponentTypeEnum.POSITION, ComponentTypeEnum.MOVEMENT]);
    }
    update(dt) {
        for (const e of this.entities) {
            let posComp = (e.getComponent(ComponentTypeEnum.POSITION));
            let movComp = (e.getComponent(ComponentTypeEnum.MOVEMENT));
            // Do movement calculations and set positions accordingly
            Object.keys(posComp.position).forEach((coord) => {
                movComp.velocity[coord] += movComp.accelerationDirection[coord] * dt;
                movComp.velocity[coord] += movComp.constantAcceleration[coord] * dt;
                movComp.velocity[coord] = Math.min(movComp.velocity[coord], movComp.maxVelocity[coord]);
                movComp.velocity[coord] = Math.max(movComp.velocity[coord], movComp.minVelocity[coord]);
                posComp.position[coord] += movComp.velocity[coord] * dt;
                movComp.accelerationDirection[coord] = 0.0;
            });
            console.log(movComp.velocity);
        }
    }
}
//# sourceMappingURL=MovementSystem.js.map