class AudioSystem extends System {
    audio: AudioPlayer;

    constructor(audio: AudioPlayer) {
        super([ComponentTypeEnum.AUDIO]);

        this.audio = audio;

    }

    update(dt: number) {
        this.audio.playSound('music', true);
        for(const e of this.entities) {
            let ac = <AudioComponent>e.getComponent(ComponentTypeEnum.AUDIO);
            let mc = <MovementComponent>e.getComponent(ComponentTypeEnum.MOVEMENT);
            let bc = <BombComponent>e.getComponent(ComponentTypeEnum.BOMB);
            let cc = <CollisionComponent>e.getComponent(ComponentTypeEnum.COLLISION);

            //if jump requested
            // if(mc?.jumpRequested){
            //     this.audio.playSound('bell', false);
            // }

            //if bomb explodes
            if(bc?.exploding) {
                this.audio.playSound('explode', false);
            }


            //if bomb has exploded
            if(bc?.exploded) {
                this.audio.pauseSound('explode');
            }

            //om bomb och spelare kolliderat
            //spela kollision
            ac.timeSinceStarted += dt;
            if(bc && cc && mc) {
                const v = mc.velocity.xy.length2();
                const canPlay = ac.timeSinceStarted > ac.playInterval;
                if(cc.currentCollisionEntities.size && v > 10.0 && canPlay) {  
                    this.audio.pauseSound('bump');
                    this.audio.setTime('bump', 0.0);
                    this.audio.playSound('bump', false);
                    ac.timeSinceStarted = 0.0;
                }
            }


        }
    }
}