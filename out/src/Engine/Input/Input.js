class Input {
    // hudObjects: GameObject[];
    constructor(gl, camera, audioPlayer, texturesRequestedVsLoaded) {
        this.gl = gl;
        this.camera = camera;
        this.audioPlayer = audioPlayer;
        this.texturesRequestedVsLoaded = texturesRequestedVsLoaded;
        this.keys = [];
        this.drawHud = true;
        this.anyPressed = false;
        this.lastAnyPressed = false;
        this.playAllAudio = true;
        //----Controls----
        let self = this;
        document.addEventListener("keydown", function (event) {
            self.keys[event.keyCode] = true;
            self.drawHud = false;
            self.anyPressed = true;
            //"Hack" to allow audio on ios safari - user initiated sounds
            if (self.playAllAudio) {
                for (let sound in self.audioPlayer.sounds) {
                    self.audioPlayer.sounds[sound].play();
                    self.audioPlayer.sounds[sound].pause();
                }
                self.playAllAudio = false;
            }
        });
        document.addEventListener("keyup", function (event) {
            self.keys[event.keyCode] = false;
        });
        document.addEventListener("touchstart", function (event) {
            self.handleTouch(event.touches);
        });
        document.addEventListener("touchmove", function (event) {
            event.preventDefault();
            self.handleTouch(event.touches);
        });
        document.addEventListener("touchend", function (event) {
            self.handleTouch(event.touches);
        });
        //----------------
        // this.hudObjects = [];
        this.setupHud();
    }
    setupHud() {
        // let leftArrow = new GameObject(this.gl, this.texturesRequestedVsLoaded);
        // leftArrow.setSize(-1.0, 1.0);
        // leftArrow.setTexture("Assets/Textures/Buttons/Button.png");
        // let rightArrow = new GameObject(this.gl, this.texturesRequestedVsLoaded);
        // rightArrow.setTexture("Assets/Textures/Buttons/Button.png");
        // let upArrow = new GameObject(this.gl, this.texturesRequestedVsLoaded);
        // upArrow.setRotation(-90.0);
        // upArrow.setTexture("Assets/Textures/Buttons/Button.png");
        // this.hudObjects.push(leftArrow);
        // this.hudObjects.push(rightArrow);
        // this.hudObjects.push(upArrow);
    }
    handleTouch(touches) {
        //"Hack" to allow audio on ios safari - user initiated sounds
        if (this.playAllAudio) {
            for (let sound in this.audioPlayer.sounds) {
                this.audioPlayer.sounds[sound].play();
                this.audioPlayer.sounds[sound].pause();
            }
            this.playAllAudio = false;
        }
        this.anyPressed = true;
        this.drawHud = true;
        let padding = parseInt(this.gl.canvas.style.paddingLeft, 10);
        let width = parseInt(this.gl.canvas.style.width, 10);
        this.keys[37] = false;
        this.keys[38] = false;
        this.keys[39] = false;
        // for (let touch in touches) {
        // 	if (touch.clientX >= padding + width * 0.0625
        // 		 && touch.clientX <= padding + width * 0.1875) { //Left
        // 		this.keys[37] = true;
        // 	}
        // 	if (touch.clientX >= padding + width * 0.2125
        // 		 && touch.clientX <= padding + width * 0.3375) { //Right
        // 		this.keys[39] = true;
        // 	}
        // 	if (touch.clientX >= padding + width * 0.6875) { //Up
        // 		this.keys[38] = true;
        // 	}
        // }
    }
    listenForAnyInteraction() {
        return this.lastAnyPressed || this.anyPressed;
    }
    update(dt) {
        this.lastAnyPressed = this.anyPressed;
        this.anyPressed = false;
    }
    draw() {
        if (this.drawHud) {
            // this.hudObjects[0].setPosition(this.camera.posX - 2.5, this.camera.posY - 2.25, 1.5);
            // this.hudObjects[1].setPosition(this.camera.posX - 2.3, this.camera.posY - 2.25, 1.5);
            // this.hudObjects[2].setPosition(this.camera.posX + 1.5, this.camera.posY - 2.25, 1.5);
            // for (let hudObject in this.hudObjects) {
            // 	this.hudObject.draw();
            // }
        }
    }
}
;
//# sourceMappingURL=Input.js.map