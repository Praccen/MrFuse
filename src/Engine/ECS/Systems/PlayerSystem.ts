class PlayerSystem extends System {

    constructor() {
        super([ComponentTypeEnum.PLAYER, ComponentTypeEnum.ANIMATION, ComponentTypeEnum.POSITION]);
    }

    update(dt: number) {
        for (let entity of this.entities) {
            let posComp = <PositionComponent> entity.getComponent(ComponentTypeEnum.POSITION);
            let animComp = <AnimationComponent> entity.getComponent(ComponentTypeEnum.ANIMATION);

            animComp.modAdvancement.x = 4.0;
            animComp.startingTile.y = 2.0;
            animComp.updateInterval = 0.15;

            if (input.keys["d"] || input.keys["ArrowRight"]) {
                posComp.scale.xy.x = 1.0;
            } else if (input.keys["a"] || input.keys["ArrowLeft"]) {
                posComp.scale.xy.x = -1.0;
            }
            else {
                animComp.modAdvancement.x = 2.0;
                animComp.startingTile.y = 3.0;
                animComp.updateInterval = 0.7;
            }
        }
    }
};