class Camera {
    private gl: WebGL2RenderingContext;
    private posX: number;
    private posY: number;
    private zoom: number;
    private rotation: number;
    private ratio: number;
    private matrixNeedsUpdate: boolean;
    private viewMatrix: Matrix4;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;

        //----View----
		this.posX = 0.0;
		this.posY = 0.0;
        this.zoom = 1.0;
        this.rotation = 0.0;
        this.ratio = 16.0/9.0;
        this.viewMatrix = new Matrix4(null);
        this.matrixNeedsUpdate = true;
        //------------
	}

    getViewMatrix() {
        return this.viewMatrix;
    }

    getPosition() {
        return {x: this.posX, y: this.posY};
    }

    setPosition(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.matrixNeedsUpdate = true;
    }

    setZoom(zoomAmount) {
        this.zoom = zoomAmount;
        this.matrixNeedsUpdate = true;
    }

    setRotation(rotation) {
        this.rotation = rotation;
        this.matrixNeedsUpdate = true;
    }

    setAspectRatio(ratio) {
        this.ratio = ratio;
        this.matrixNeedsUpdate = true;
    }

    bindViewMatrix(uniformLocation: WebGLUniformLocation) {
        if (this.matrixNeedsUpdate) {
            this.viewMatrix.setIdentity();
            this.viewMatrix.scale(this.zoom, this.zoom * this.ratio, 1.0);
            this.viewMatrix.rotate(this.rotation, 0.0, 0.0, 1.0);
            this.viewMatrix.translate(-this.posX, -this.posY, 0.0);
            this.matrixNeedsUpdate = false;
        }
        
        this.gl.uniformMatrix4fv(uniformLocation, false, this.viewMatrix.elements);
    }
};