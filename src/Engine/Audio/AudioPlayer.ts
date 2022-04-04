class AudioPlayer {
    sounds: object;
    active: boolean; //set to true when user has interacted with document

	constructor() {
        this.sounds = {
            bell: new Audio("Assets/Audio/Effects/bell.m4a"), //https://opengameart.org/content/100-cc0-sfx
            bump: new Audio("Assets/Audio/Effects/nutfall.flac"),
            explode: new Audio("Assets/Audio/Effects/explosion.wav"),
            music: new Audio("Assets/Audio/Effects/DanceAndJump.ogg"),
        }
        this.active = false;

        for (let sound in this.sounds) {
            this.sounds[sound].preload = "auto";
        }
        
        this.setVolume("bell", 0.3);
        this.setVolume('music', 0.6);
	}
    
    playSound(key, loop) {
        this.sounds[key].loop = loop;
        this.active && this.sounds[key].play();
    }
    
    setVolume(key, volume) {
        this.sounds[key].volume = volume;
    }
    
    setTime(key, time) {
        this.sounds[key].currentTime = time;
    }
    
    pauseSound(key) {
        this.sounds[key].pause();
    }

    stopAll() {
        for(const s of Object.values(this.sounds)) {
            s.pause();
            s.currentTime = 0.0;
        }
    }
};