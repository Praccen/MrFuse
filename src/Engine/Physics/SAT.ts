class SAT {
    getOverlap(overlapVector: Vec2, shapeAVertices: Array<Vec2>, shapeBVertices: Array<Vec2>, reverse: {value: boolean}): number {
        let maxA = overlapVector.dot(shapeAVertices[0]);
        let minA = maxA;
        let maxB = overlapVector.dot(shapeBVertices[0]);
        let minB = maxB;

        let tempDot = 0.0;

        for (let i = 1; i < shapeAVertices.length; i++) {
            tempDot = overlapVector.dot(shapeAVertices[i]);
            if (tempDot < minA) {
                minA = tempDot;
            }
            if (tempDot > maxA) {
                maxA = tempDot;
            }
        }

        for (let i = 1; i < shapeBVertices.length; i++) {
            tempDot =  overlapVector.dot(shapeBVertices[i]);
            if (tempDot < minB) {
                minB = tempDot;
            }
            if (tempDot > maxB) {
                maxB = tempDot;
            }
        }

        let overlap1 = maxB - minA;
        let overlap2 = maxA - minB;
        if (overlap1 >= 0.0 && overlap2 >= 0.0) {
            if (overlap1 > overlap2) {
                reverse.value = true;
                return overlap2;
            }
            else {
                reverse.value = false;
                return overlap1;
            }
        }

        return -1.0;
    }

	getIntersection(shapeA: Shape, shapeB: Shape, intersectionAxis: Vec2, intersectionDepth: {depth: number}): boolean {
        intersectionDepth.depth = Infinity;

        let shapeAVertices = shapeA.getTransformedVertices();
        let shapeBVertices = shapeB.getTransformedVertices();

        let shapeANormals = shapeA.getTransformedNormals();
        for (let i = 0; i < shapeANormals.length; i++) {
            let reverse = {value: false};
            let overlap: number = this.getOverlap(shapeANormals[i], shapeAVertices, shapeBVertices, reverse);

            if (overlap < 0.0) {
                return false;
            }

            if (overlap < intersectionDepth.depth) {
                intersectionDepth[0] = overlap;
                intersectionAxis.x = shapeANormals[i].x;
                intersectionAxis.y = shapeANormals[i].y;
                if (reverse.value) {
                    intersectionAxis.flip();
                }
            }
        }

        let shapeBNormals = shapeB.getTransformedNormals();
        for (let i = 0; i < shapeBNormals.length; i++) {
            let reverse = {value: false};
            let overlap: number = this.getOverlap(shapeBNormals[i], shapeAVertices, shapeBVertices, reverse);

            if (overlap < 0.0) {
                return false;
            }

            if (overlap < intersectionDepth.depth) {
                intersectionDepth.depth = overlap;
                intersectionAxis.x = shapeBNormals[i].x;
                intersectionAxis.y = shapeBNormals[i].y;
                if (reverse.value) {
                    intersectionAxis.flip();
                }
            }
        }

        return true;
    }
};