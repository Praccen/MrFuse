class Shape {
    constructor() {
        this.originalVertices = new Array();
        this.originalNormals = new Array();
        this.transformedVertices = new Array();
        this.transformedNormals = new Array();
        this.transformMatrix = new Matrix4(null);
        this.verticesNeedsUpdate = false;
        this.normalsNeedsUpdate = false;
    }
    addVertex(vertex) {
        this.originalVertices.push(vertex);
        this.verticesNeedsUpdate = true;
    }
    addNormal(normal) {
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
    setTransformMatrix(matrix) {
        this.transformMatrix = matrix;
        this.verticesNeedsUpdate = true;
        this.normalsNeedsUpdate = true;
    }
    getTransformedVertices() {
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
    getTransformedNormals() {
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
}
;
//# sourceMappingURL=Shape.js.map