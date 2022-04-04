class AudioPlayer {
    constructor() {
        this.sounds = {
            bell: new Audio("Assets/Audio/Effects/bell.m4a"),
            fuse: new Audio("Assets/Audio/Effects/fuse.ogg"),
            bump: new Audio("Assets/Audio/Effects/nutfall.flac"),
            explode: new Audio("Assets/Audio/Effects/explosion.wav"),
        };
        for (let sound in this.sounds) {
            this.sounds[sound].preload = "auto";
        }
        this.setVolume("bell", 0.3);
        this.setVolume('fuse', 0.1);
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
}
;
//# sourceMappingURL=AudioPlayer.js.map