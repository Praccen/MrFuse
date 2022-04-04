class AudioSystem extends System {
    constructor(audio) {
        super([ComponentTypeEnum.AUDIO]);
        this.audio = audio;
    }
    update(dt) {
        this.audio.playSound('music', true);
        for (const e of this.entities) {
            let ac = e.getComponent(ComponentTypeEnum.AUDIO);
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
            if (bc === null || bc === void 0 ? void 0 : bc.exploding) {
                this.audio.pauseSound('fuse');
                this.audio.playSound('explode', false);
            }
            //om bomb inte exploderar och inte har exploderat
            //spela fuse (högre och högre?)
            if (!(bc === null || bc === void 0 ? void 0 : bc.exploded) && !(bc === null || bc === void 0 ? void 0 : bc.exploding)) {
                //this.audio.pauseSound('fuse');
                //this.audio.setTime('fuse', 0.0);
                this.audio.playSound('fuse', false);
            }
            //om bomb har exploderat
            //tysta explosion
            if (bc === null || bc === void 0 ? void 0 : bc.exploded) {
                this.audio.pauseSound('explode');
            }
            //om bomb och spelare kolliderat
            //spela kollision
            ac.timeSinceStarted += dt;
            if (bc && cc && mc) {
                const v = mc.velocity.xy.length2();
                const canPlay = ac.timeSinceStarted > ac.playInterval;
                if (cc.currentCollisionEntities.size && v > 10.0 && canPlay) {
                    this.audio.pauseSound('bump');
                    this.audio.setTime('bump', 0.0);
                    this.audio.playSound('bump', false);
                    ac.timeSinceStarted = 0.0;
                }
            }
        }
        //spela musik (snabbare om bomben är påväg att sprängas?)
    }
}
//# sourceMappingURL=AudioSystem.js.map