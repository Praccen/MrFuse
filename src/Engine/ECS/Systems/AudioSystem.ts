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
            if(bc?.exploding) {
                this.audio.pauseSound('fuse');
                this.audio.playSound('explode', false);
            }

            //om bomb inte exploderar och inte har exploderat
            //spela fuse (högre och högre?)
            // if(!bc?.exploded && !bc?.exploding) {
            //     this.audio.pauseSound('fuse');
            //     this.audio.setTime('fuse', 0.0);
            //     this.audio.playSound('fuse', false);
            // }

            //om bomb har exploderat
            //tysta explosion
            if(bc?.exploded) {
                this.audio.pauseSound('explode');
            }

            //om bomb och spelare kolliderat
            //spela kollision
            if(bc && cc) {
                if(cc.currentCollisionEntities.size) {  
                    this.audio.pauseSound('bump');
                    this.audio.setTime('bump', 0.0);
                    this.audio.playSound('bump', false);
                }
            }


        }

        //spela musik (snabbare om bomben är påväg att sprängas?)
    }
}