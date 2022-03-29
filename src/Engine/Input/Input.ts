class Input {
	keys: boolean[];

	constructor() {
		this.keys = [];

		//----Controls----
		let self = this;
		document.addEventListener("keydown", function (event) {
			self.keys[event.keyCode] = true;
		});

		document.addEventListener("keyup", function (event) {
			self.keys[event.keyCode] = false;
		});
		//----------------
	}
};