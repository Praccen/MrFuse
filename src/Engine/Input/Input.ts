class Input {
	keys: boolean[];
	mousePosition: {x: number, y:number};
    mouseClicked: boolean;

    private touchUsed: boolean;
    drawHud: boolean;

	constructor() {
		this.keys = [];
		this.mousePosition = {x: 0, y: 0};
        this.mouseClicked = false;

        this.drawHud = false;

		//----Controls----
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values <-- for key codes
		let self = this;
		document.addEventListener("keydown", function (event) {
			self.keys[event.key] = true;
            self.drawHud = false;
		});

		document.addEventListener("keyup", function (event) {
			self.keys[event.key] = false;
            self.drawHud = false;
		});

		canvas.addEventListener("mousemove", function (event) {
			self.mousePosition =  {x: event.clientX, y: event.clientY};
		});
        document.addEventListener("mousedown", (event) => {
            self.mouseClicked = true;
        });
        document.addEventListener("mouseup", (event) => {
            self.mouseClicked = false;
        })

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
	}

    handleTouch(touches) {
        this.drawHud = true;

        var paddingX = parseInt(canvas.style.paddingLeft, 10);
        var paddingY = parseInt(canvas.style.paddingTop, 10);
        var width = parseInt(canvas.style.width, 10);
        var height = parseInt(canvas.style.height, 10);

        this.keys["w"] = false;
        this.keys["a"] = false;
        this.keys["s"] = false;
        this.keys["d"] = false;
        this.keys[" "] = false;

        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i];
            if (touch.clientX < paddingX + width * 0.1875) { //Left
                this.keys["a"] = true;
            }

            if (touch.clientX > paddingX + width * 0.2125
                    && touch.clientX < paddingX + width * 0.3375) { //Right
                this.keys["d"] = true;
            }

            if (touch.clientX > paddingX + width * 0.6875) { //Up
                this.keys["w"] = true;
            }

            if (touch.clientY < paddingY + height * 0.3) { //Up
                this.keys[" "] = true;
            }
        }
    }
};