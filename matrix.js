class TransformationMatrix {
    constructor() {
        this.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    }

    translate(x, y) {
        this.matrix[2][0] += x;
        this.matrix[2][1] += y;

    }

    rotate(rads) {
        var multMatrix = new TransformationMatrix();
        multMatrix.matrix = createWithVals(Math.cos(rads), -Math.sin(rads), Math.sin(rads), Math.cos(rads));
        this.matrix = this.multiplyLeft(multMatrix);
    }

    multiplyLeft(multMatrix) {
        var newMatrix = [];
        console.log(multMatrix.matrix);
        console.log(this.matrix);
        for (var i = 0; i < multMatrix.matrix.length; i++) {
            newMatrix.push([]);
            for (var j = 0; j < multMatrix.matrix.length; j++) {
                newMatrix[i].push(0);
                for (var k = 0; k < this.matrix.length; k++) {
                    console.log(multMatrix.matrix[j][k]);
                    console.log(this.matrix[k][j]);
                    newMatrix[i][j] += multMatrix.matrix[i][k] * this.matrix[k][j];
                }
            }
        }
        console.log(newMatrix);
        return newMatrix;
    }

}