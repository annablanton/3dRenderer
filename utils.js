// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// add global parameters here

const PARAMS = {
    DEBUG: false,
    SCALE: 3,
    BITWIDTH: 16
};

function frameRotationMatrix(game) {
    var tempCanvas = document.createElement("canvas");
    var tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = 800;
    tempCanvas.height = 800;
    tempCtx.fillStyle = "Red";

    tempCtx.fillStyle = "Black";
    tempCtx.save();
    tempCtx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    tempCtx.rotate(-1 * game.player.direction - Math.PI / 2);
    tempCtx.translate(-1 * game.player.x, -1 * game.player.y);
    var transMat = tempCtx.getTransform();
    var matArray = [[transMat.m11, transMat.m21, transMat.m41], [transMat.m12, transMat.m22, transMat.m42], [transMat.m13, transMat.m23, transMat.m33]];
    tempCtx.restore;
    return matArray;
}

function rotationCanvas(spritesheet, sx, sy, sw, sh, rads) {
    var offscreenCanvas = document.createElement("canvas");
    var dim = Math.max(sw, sh);
    offscreenCanvas.width = dim;
    offscreenCanvas.height = dim;
    var offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenCtx.save();
    offscreenCtx.translate(dim/2, dim/2);
    offscreenCtx.rotate(rads);
    offscreenCtx.translate(-1 * (dim / 2), -1 * (dim / 2));
    offscreenCtx.drawImage(spritesheet, sx, sy, sw, sh, (dim - sw) / 2, (dim - sh) / 2, sw, sh);
    offscreenCtx.restore();
    return offscreenCanvas;
}

function getAngle(vector) {
    var acos = Math.acos(vector.x);
    var asin = Math.asin(vector.y);

    if (asin < 0) {
        angle = 2 * Math.PI - acos;
    } else {
        angle = acos;
    }

    return angle;
}

function createWithVals(a, b, c, d) {
    return [[a, b, 0], [c, d, 0], [0, 0, 1]];
}

function matByVec(mat, vec) {
    var newVector = [];
    //console.log("fjdasiofjasd");
    for (var i = 0; i < mat.length; i++) {
        newVector.push(0);
        for (var j = 0; j < mat[i].length; j++) {
            //console.log(mat[i][j] * vec[j]);
            newVector[i] += mat[i][j] * vec[j];
        }
    }

    //console.log(newVector);

    return new Vector(newVector[0], newVector[1]);
}

function viewAngleIntersection(posVector, deltaVector) {
    var initY = posVector.y;
    var yDelta = deltaVector.y;
    //console.log(posVector);
    //console.log(deltaVector);

    var distanceFromViewAngle = 400 - posVector.y;
    var t = distanceFromViewAngle / yDelta;
    return new Point(posVector.x + deltaVector.x * t, 400);
}

function findHypotenuse(a, b) {
    return Math.sqrt(a ** 2 + b ** 2);
}

function transformEntity(game, entity, matrix) {
    //var tempCanvas = document.createElement("canvas");
    //var tempCtx = tempCanvas.getContext("2d");
    //tempCanvas.width = CANVAS_WIDTH;
    //tempCanvas.height = CANVAS_HEIGHT;
    //tempCtx.fillStyle = "Red";
    ////tempCtx.fillRect(395, 395, 10, 10);
    //tempCtx.fillStyle = "Black";
    ////tempCtx.fillRect(470, 612, 20, 20);
    //tempCtx.save();
    //tempCtx.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    //tempCtx.rotate(-1 * game.player.direction - Math.PI / 2);
    //tempCtx.translate(-1 * game.player.x, -1 * game.player.y);
    //var transMat = tempCtx.getTransform();
    //console.log("transMat" + transMat);
    //var matArray = [[transMat.m11, transMat.m21, transMat.m41], [transMat.m12, transMat.m22, transMat.m42], [transMat.m13, transMat.m23, transMat.m33]];
    //console.log("matArray" + matArray);
    //console.log(transformedVec);
    //player.draw(tempCtx);
    //this..draw(tempCtx);
    //tempCtx.restore();
    var homogVec = [entity.x, entity.y, 1];
    var transformedVec = matByVec(matrix, homogVec);
    //console.log(transformedVec);
    //console.log(transformedVec1);
    var playerEntityVector = new Vector(game.player.x - entity.x, game.player.y - entity.y);
    playerEntityVector.normalize();
    var dirAngle = getAngle(playerEntityVector);
    var adjustedDirAngle = (dirAngle - entity.direction);
    if (adjustedDirAngle < 0) {
        adjustedDirAngle = 2 * Math.PI + adjustedDirAngle;
    }

    //var homogVec2 = [this.p2.x, this.p2.y, 1];
    //var transformedVec2 = matByVec(matArray, homogVec2);
    return new entity.constructor(game, transformedVec.x, transformedVec.y, adjustedDirAngle, entity.elapsedTime);
}

//function gaussJordan(matrix) {
//    var h = 0;
//    var k = 0;

//    while (h < matrix.length && k < matrix[0].length) {
//        var max = h;
//        for (var i = h+1; i < matrix.length; i++) {
//            if (Math.abs(matrix[i][k]) > Math.abs(matrix[max][k])) {
//                max = i;
//            }
//        }

//        if (matrix[max][k] === 0) {
//            k++;
//        } else {
//            swapRows(matrix, h, max);
//            for (var i = h + 1; i < matrix.length; i++) {
//                var f = matrix[i][k] / matrix[h][k];
//                matrix[i][k] = 0;
//                for (var j = k + 1; j < matrix[i].length; j++) {
//                    matrix[i][j] = matrix[i][j] - matrix[h][j] * f;
//                }

//                h++;
//                k++;
//            }
//        }
//    }
//}

//function swapRows(matrix, h, i) {
//    var temp = matrix[h];
//    matrix[h] = matrix[i];
//    matrix[i] = temp;
//}