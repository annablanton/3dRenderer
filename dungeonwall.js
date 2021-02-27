class DungeonWall {
    constructor(game, startX, startY, axis, endCoord, color, bsp) {
        this.p1 = new Point(startX * 2, startY * 2);
        if (axis == 'x') this.p2 = new Point(endCoord * 2, startY * 2);
        else this.p2 = new Point(startX * 2, endCoord * 2);
        Object.assign(this, { game, color, axis })
        this.lineCollision = true;
        if (axis == 'x') {
            var lowerX = Math.min(startX, endCoord);
            var upperX = Math.max(startX, endCoord);
            if (startY - 1 >= 0) {
                for (var j = lowerX; j < upperX; j++) {
                    this.game.dungeon[startY][j].addWall('top');
                    this.game.dungeon[startY - 1][j].addWall('bottom');
                }
            } else {
                for (var j = lowerX; j < upperX; j++) {
                    this.game.dungeon[startY][j].addWall('top');
                }
            }
        } else {
            var lowerY = Math.min(startY, endCoord);
            var upperY = Math.max(startY, endCoord);
            if (startX - 1 >= 0) {
                for (var i = lowerY; i < upperY; i++) {
                    this.game.dungeon[i][startX].addWall("left");
                    this.game.dungeon[i][startX - 1].addWall("right");
                }
            } else {
                for (var i = lowerY; i < upperY; i++) {
                    this.game.dungeon[i][startX].addWall("left");
                }
            }
        }

        //console.log(this.game.dungeon);
    }

    update() {

    }

    getRotation(matrix) {


        return this.transformWall(matrix);
    //    intCtx.beginPath();
    //    var v1 = transWall.p1;
    //    var v2 = transWall.p2;
    //    var viewWall = null;
    //    //var nextEdge = [];
    //    if (v1.y <= CANVAS_HEIGHT / 2) {
    //        //var finalV1 = new Point(((v1.x - CANVAS_WIDTH/2) / (findHypotenuse(v1.x-CANVAS_WIDTH/2, v1.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v1.y);
    //        var finalV1 = this.transformPoint(v1);
    //        //console.log(v1);
    //        //console.log(finalV1);
    //        //console.log(finalV1);
    //        intCtx.moveTo(finalV1.x, finalV1.y);
    //        //console.log(v1);
    //        //console.log(finalV1);
    //        //viewVertices.push(finalV1);
    //        //nextEdge.push(numVertices++);
    //        if (v2.y <= CANVAS_HEIGHT / 2) {
    //            //var finalV2 = new Point(((v2.x - CANVAS_WIDTH/2) / (findHypotenuse(v2.x-CANVAS_WIDTH/2, v2.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v2.y);
    //            var finalV2 = this.transformPoint(v2);
    //            //viewVertices.push(finalV2);
    //            //console.log(finalV2);
    //            intCtx.lineTo(finalV2.x, finalV2.y);
    //            //nextEdge.push(numVertices++);
    //            //nextEdge.push(transMap.edgeArrays[i][2]); 
    //            //viewEdges.push(nextEdge);
    //            viewWall = new Wall(this, finalV1, finalV2, transWall.color);
    //            intCtx.stroke();
    //        } else {
    //            var xDelta = v1.x - v2.x;
    //            var yDelta = v1.y - v2.y;
    //            var vector = new Point(xDelta, yDelta);
    //            vector.normalize();
    //            //console.log(vector);
    //            var posVector = new Point(v1.x, v1.y);
    //            //console.log(v1.x, v1.y);
    //            var viewAngleInter = viewAngleIntersection(posVector, vector);
    //            //var finalV2 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / (findHypotenuse(viewAngleInter.x - CANVAS_WIDTH / 2, viewAngleInter.y - CANVAS_HEIGHT / 2))
    //            //    * this.SCALE + CANVAS_WIDTH/2, viewAngleInter.y);
    //            var finalV2 = this.transformPoint(viewAngleInter);


    //            //viewVertices.push(finalV2);
    //            //console.log(viewAngleInter);
    //            intCtx.lineTo(finalV2.x, finalV2.y);
    //            //nextEdge.push(numVertices++);
    //            //nextEdge.push(transMap.edgeArrays[i][2]);
    //            //console.log(transMap.edgeArrays[i][2]);
    //            //viewEdges.push(nextEdge);
    //            viewWall = new Wall(this, finalV1, finalV2, transWall.color);
    //            intCtx.stroke();
    //            //console.log(viewWall);
    //        }
    //    } else {
    //        if (v2.y <= CANVAS_HEIGHT / 2) {
    //            //ctx.moveTo(v2.x, v2.y);
    //            var xDelta = v1.x - v2.x;
    //            var yDelta = v1.y - v2.y;
    //            var vector = new Point(xDelta, yDelta);
    //            vector.normalize();
    //            //console.log(vector);
    //            var posVector = new Point(v1.x, v1.y);
    //            //console.log(v1.x, v1.y);
    //            var viewAngleInter = viewAngleIntersection(posVector, vector);
    //            //console.log(viewAngleInter);
    //            //ctx.lineTo(viewAngleInter.x, viewAngleInter.y);
    //            //var finalV1 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / (findHypotenuse(viewAngleInter.x - CANVAS_WIDTH / 2, viewAngleInter.y - CANVAS_HEIGHT / 2)) * this.SCALE+CANVAS_WIDTH / 2, viewAngleInter.y);
    //            var finalV1 = this.transformPoint(viewAngleInter);
    //            //viewVertices.push(finalV1);
    //            intCtx.moveTo(finalV1.x, finalV1.y);
    //            //nextEdge.push(numVertices++);
    //            var finalV2 = this.transformPoint(v2);
    //            //viewVertices.push(finalV2);
    //            intCtx.lineTo(finalV2.x, finalV2.y);
    //            //nextEdge.push(numVertices++);
    //            //nextEdge.push(transMap.edgeArrays[i][2]);
    //            //viewEdges.push(nextEdge);

    //            viewWall = new Wall(this, finalV1, finalV2, transWall.color);
    //            intCtx.stroke();
    //        }
    //    }

    //    return viewWall;

    }

    //getTransform(intCtx) {
    //    intCtx.beginPath();
    //    var v1 = transWall.p1;
    //    var v2 = transWall.p2;
    //    var viewWall = null;
    //    //var nextEdge = [];
    //    if (v1.y <= CANVAS_HEIGHT / 2) {
    //        //var finalV1 = new Point(((v1.x - CANVAS_WIDTH/2) / (findHypotenuse(v1.x-CANVAS_WIDTH/2, v1.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v1.y);
    //        var finalV1 = this.transformPoint(v1);
    //        //console.log(v1);
    //        //console.log(finalV1);
    //        //console.log(finalV1);
    //        intCtx.moveTo(finalV1.x, finalV1.y);
    //        //console.log(v1);
    //        //console.log(finalV1);
    //        //viewVertices.push(finalV1);
    //        //nextEdge.push(numVertices++);
    //        if (v2.y <= CANVAS_HEIGHT / 2) {
    //            //var finalV2 = new Point(((v2.x - CANVAS_WIDTH/2) / (findHypotenuse(v2.x-CANVAS_WIDTH/2, v2.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v2.y);
    //            var finalV2 = this.transformPoint(v2);
    //            //viewVertices.push(finalV2);
    //            //console.log(finalV2);
    //            intCtx.lineTo(finalV2.x, finalV2.y);
    //            //nextEdge.push(numVertices++);
    //            //nextEdge.push(transMap.edgeArrays[i][2]); 
    //            //viewEdges.push(nextEdge);
    //            viewWall = new Wall(this, finalV1, finalV2, transWall.color);
    //            intCtx.stroke();
    //        } else {
    //            var xDelta = v1.x - v2.x;
    //            var yDelta = v1.y - v2.y;
    //            var vector = new Point(xDelta, yDelta);
    //            vector.normalize();
    //            //console.log(vector);
    //            var posVector = new Point(v1.x, v1.y);
    //            //console.log(v1.x, v1.y);
    //            var viewAngleInter = viewAngleIntersection(posVector, vector);
    //            //var finalV2 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / (findHypotenuse(viewAngleInter.x - CANVAS_WIDTH / 2, viewAngleInter.y - CANVAS_HEIGHT / 2))
    //            //    * this.SCALE + CANVAS_WIDTH/2, viewAngleInter.y);
    //            var finalV2 = this.transformPoint(viewAngleInter);


    //            //viewVertices.push(finalV2);
    //            //console.log(viewAngleInter);
    //            intCtx.lineTo(finalV2.x, finalV2.y);
    //            //nextEdge.push(numVertices++);
    //            //nextEdge.push(transMap.edgeArrays[i][2]);
    //            //console.log(transMap.edgeArrays[i][2]);
    //            //viewEdges.push(nextEdge);
    //            viewWall = new Wall(this, finalV1, finalV2, transWall.color);
    //            intCtx.stroke();
    //            //console.log(viewWall);
    //        }
    //    } else {
    //        if (v2.y <= CANVAS_HEIGHT / 2) {
    //            //ctx.moveTo(v2.x, v2.y);
    //            var xDelta = v1.x - v2.x;
    //            var yDelta = v1.y - v2.y;
    //            var vector = new Point(xDelta, yDelta);
    //            vector.normalize();
    //            //console.log(vector);
    //            var posVector = new Point(v1.x, v1.y);
    //            //console.log(v1.x, v1.y);
    //            var viewAngleInter = viewAngleIntersection(posVector, vector);
    //            //console.log(viewAngleInter);
    //            //ctx.lineTo(viewAngleInter.x, viewAngleInter.y);
    //            //var finalV1 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / (findHypotenuse(viewAngleInter.x - CANVAS_WIDTH / 2, viewAngleInter.y - CANVAS_HEIGHT / 2)) * this.SCALE+CANVAS_WIDTH / 2, viewAngleInter.y);
    //            var finalV1 = this.transformPoint(viewAngleInter);
    //            //viewVertices.push(finalV1);
    //            intCtx.moveTo(finalV1.x, finalV1.y);
    //            //nextEdge.push(numVertices++);
    //            var finalV2 = this.transformPoint(v2);
    //            //viewVertices.push(finalV2);
    //            intCtx.lineTo(finalV2.x, finalV2.y);
    //            //nextEdge.push(numVertices++);
    //            //nextEdge.push(transMap.edgeArrays[i][2]);
    //            //viewEdges.push(nextEdge);

    //            viewWall = new Wall(this, finalV1, finalV2, transWall.color);
    //            intCtx.stroke();
    //        }
    //    }

    //    return viewWall;
    //}

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        //console.log(vertices[this.edgeArrays[i][j - 1]]);
        //console.log(vertices[this.edgeArrays[i][j]]);
        ctx.lineTo(this.p2.x, this.p2.y);
        //console.log(curr);
        ctx.stroke();
    }

    transformWall(matrix) {
        var homogVec1 = [this.p1.x, this.p1.y, 1];
        var transformedVec1 = matByVec(matrix, homogVec1);

        var homogVec2 = [this.p2.x, this.p2.y, 1];
        var transformedVec2 = matByVec(matrix, homogVec2);
        return new Wall(this, transformedVec1, transformedVec2, this.color);
    }

    //transformPoint(p) {
    //    return new Point(PRE_SCALE * -(CANVAS_WIDTH / 2 - p.x) / ((CANVAS_HEIGHT / 2 - p.y) + 2) + CANVAS_WIDTH / 2, p.y);
    //}
}