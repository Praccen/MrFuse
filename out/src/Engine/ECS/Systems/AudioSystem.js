class AudioSystem extends System {
    constructor(audio) {
        super([ComponentTypeEnum.AUDIO]);
        this.audio = audio;
    }
    update(dt) {
        for (const e of this.entities) {
            let mc = e.getComponent(ComponentTypeEnum.MOVEMENT);
            let bc = e.getComponent(ComponentTypeEnum.BOMB);
            let cc = e.getComponent(ComponentTypeEnum.COLLISION);
            //om jump-requested
            //spela jump
            if (mc === null || mc === void 0 ? void 0 : mc.jumpRequested) {
                this.audio.playSound('bell', false);
            }
            //om bomb exploderar
            //tysta fuse, spela explosion
            //om bomb inte exploderar och inte har exploderat
            //spela fuse (högre och högre?)
            //om bomb har exploderat
            //tysta explosion
            //om bomb och spelare kolliderat
            //spela kollision
            if (bc && cc) {
                if (cc.currentCollisionEntities.size) {
                    this.audio.playSound('bell', false);
                }
                // cc.currentCollisionEntities.forEach((e2) => 
                // this.audio.playSound('bell', false));
            }
        }
        //spela musik (snabbare om bomben är påväg att sprängas?)
    }
}
//# sourceMappingURL=AudioSystem.js.map