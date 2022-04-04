class AudioSystem extends System {
    audio: AudioPlayer;

    constructor(audio: AudioPlayer) {
        super([ComponentTypeEnum.AUDIO]);

        this.audio = audio;
    }

    update(dt: number) {
        for(const e of this.entities) {
            let mc = <MovementComponent>e.getComponent(ComponentTypeEnum.MOVEMENT);
            let bc = <BombComponent>e.getComponent(ComponentTypeEnum.BOMB);
            let cc = <CollisionComponent>e.getComponent(ComponentTypeEnum.COLLISION);

            //om jump-requested
            //spela jump
            if(mc?.jumpRequested){
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
            if(bc && cc && mc) {
                if(cc.currentCollisionEntities.size) {
                    //this.audio.setVolume('bell', Math.min(mc.velocity.xy.length2(), 0.2));
                    // this.audio.setTime('bell', 0.0);
                    this.audio.playSound('bump', false);
                }
                // cc.currentCollisionEntities.forEach((e2) => 
                // this.audio.playSound('bell', false));
            }


        }

        //spela musik (snabbare om bomben är påväg att sprängas?)
    }
}