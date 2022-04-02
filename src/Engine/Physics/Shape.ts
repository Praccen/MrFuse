class Shape {
    private originalVertices: Array<Vec2>;
    private originalNormals: Array<Vec2>;
    
    private transformedVertices: Array<Vec2>;
    private transformedNormals: Array<Vec2>;

    private transformMatrix: Matrix4;
    private verticesNeedsUpdate: boolean;
    private normalsNeedsUpdate: boolean;

    constructor() {
        this.originalVertices = new Array<Vec2>();
        this.originalNormals = new Array<Vec2>();
        this.transformedVertices = new Array<Vec2>();
        this.transformedNormals = new Array<Vec2>();
        this.transformMatrix = new Matrix4(null);
        this.verticesNeedsUpdate = false;
        this.normalsNeedsUpdate = false;
    }

    addVertex(vertex: Vec2) {
        this.originalVertices.push(vertex);
        this.verticesNeedsUpdate = true;   
    }

    addNormal(normal: Vec2) {
        this.originalNormals.push(normal);
        this.normalsNeedsUpdate = true;   
    }

    clearVertices() {
        this.originalVertices.length = 0;
        this.verticesNeedsUpdate = true;
    }

    clearNormals() {
        this.originalNormals.length = 0;
        this.normalsNeedsUpdate = true;   
    }

    setTransformMatrix(matrix: Matrix4) {
        this.transformMatrix = matrix;
        this.verticesNeedsUpdate = true;
        this.normalsNeedsUpdate = true;
    }

    getTransformedVertices(): Array<Vec2> {
        if (this.verticesNeedsUpdate) {
            this.transformedVertices.length = 0;

            for (const originalVertex of this.originalVertices) {
                let transformedVertex = this.transformMatrix.multiplyVector4(new Vector4([originalVertex.x, originalVertex.y, 0, 1.0]));
                let transformedVertexVec2 = new Vec2(transformedVertex.elements[0], transformedVertex.elements[1]);
                this.transformedVertices.push(transformedVertexVec2);
            }
            this.verticesNeedsUpdate = false;
        }
        return this.transformedVertices;
    }

    getTransformedNormals(): Array<Vec2> {
        if (this.normalsNeedsUpdate) {
            this.transformedNormals.length = 0;

            for (const originalNormal of this.originalNormals) {
                let tempMatrix = new Matrix4(this.transformMatrix);
                let transformedNormal = tempMatrix.invert().transpose().multiplyVector3(new Vector3([originalNormal.x, originalNormal.y, 0.0])).normalize();
                this.transformedNormals.push(new Vec2(transformedNormal.elements[0], transformedNormal.elements[1]));
            }
            this.normalsNeedsUpdate = false;
        }
        return this.transformedNormals;
    }
};