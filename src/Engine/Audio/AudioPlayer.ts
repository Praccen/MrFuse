class AudioPlayer {
    sounds: object;

	constructor() {
        this.sounds = {
            bell: new Audio("Assets/Audio/Effects/bell.m4a"), //https://opengameart.org/content/100-cc0-sfx
            fuse: new Audio("Assets/Audio/Effects/fuse.ogg")
        }
        
        for (let sound in this.sounds) {
            this.sounds[sound].preload = "auto";
        }
        
        this.setVolume("bell", 0.3);
	}
    
    playSound(key, loop) {
        this.sounds[key].loop = loop;
        this.sounds[key].play();
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
};