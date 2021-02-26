class Wall {
    constructor(game, p1, p2, color, step) {
        Object.assign(this, { game, p1, p2, color, step })
        //console.log(this.step);
        this.lineCollision = true;
        this.MAX = 1000000;

    }

    fpDraw(threeDCtx) {
        threeDCtx.beginPath();
        //console.log(this.step);
        var v1 = this.transformPoint(this.p1);
        var v2 = this.transformPoint(this.p2);
        //var v2 = this.p2;
        //threeDCtx.moveTo(v1.x, 400);
        var p1 = this.wallUpper(v1);
        //var p2 = this.wallLower(v1);
        //var p3 = this.wallLower(v2);
        //var p4 = this.wallUpper(v2);
        if (POST_SCALE / PRE_SCALE * (p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > this.MAX) threeDCtx.moveTo(this.MAX, p1.y);
        else if (POST_SCALE / PRE_SCALE * (p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -this.MAX) threeDCtx.moveTo(-this.MAX, p1.y);
        else threeDCtx.moveTo(POST_SCALE / PRE_SCALE * (p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p1.y);
        //threeDCtx.moveTo(POST_SCALE / PRE_SCALE * (p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p1.y);
        var test1 = POST_SCALE / PRE_SCALE * (p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2;

        threeDCtx.fillStyle = this.color;
        threeDCtx.strokeStyle = this.color;
        //threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p1.x - CANVAS_WIDTH/2) + CANVAS_WIDTH/2, p1.y);
        //threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p2.y);
        //threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p3.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p3.y);
        //threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p4.y);

        //threeDCtx.closePath();
        //threeDCtx.fill();
        //threeDCtx.stroke();
        for (var i = 0; i < STEP_COUNT; i++) {
            var p2 = this.wallUpper(this.transformPoint(new Point(this.p1.x + this.step.x * (i + 1), this.p1.y + this.step.y * (i + 1))));
            if (POST_SCALE / PRE_SCALE * (p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > this.MAX) threeDCtx.lineTo(this.MAX, p2.y);
            else if (POST_SCALE / PRE_SCALE * (p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -this.MAX) threeDCtx.lineTo(-this.MAX, p2.y);
            else threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p2.y);
            var test2 = POST_SCALE / PRE_SCALE * (p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2;
            //p1 = p2;
        }

        var p3 = this.wallLower(v2);
        if (POST_SCALE / PRE_SCALE * (p3.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > this.MAX) threeDCtx.lineTo(this.MAX, p3.y);
        else if (POST_SCALE / PRE_SCALE * (p3.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -this.MAX) threeDCtx.lineTo(-this.MAX, p3.y);
        else threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p3.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p3.y);
        var test3 = POST_SCALE / PRE_SCALE * (p3.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2;

        for (var i = 0; i < STEP_COUNT; i++) {
            var p4 = this.wallLower(this.transformPoint(new Point(this.p2.x - this.step.x * (i + 1), this.p2.y - this.step.y * (i + 1))));
            //threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p4.y);
            //p3 = p4;
            if (POST_SCALE / PRE_SCALE * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > this.MAX) threeDCtx.lineTo(this.MAX, p4.y);
            else if (POST_SCALE / PRE_SCALE * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -this.MAX) threeDCtx.lineTo(-this.MAX, p4.y);
            else threeDCtx.lineTo(POST_SCALE / PRE_SCALE * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p4.y);
        }
        p1 = this.wallUpper(v1);

        var test4 = POST_SCALE / PRE_SCALE * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2;

        //threeDCtx.lineTo(p1.x, p1.y);
        threeDCtx.closePath();
        threeDCtx.fill();
        threeDCtx.stroke();
    }

    getTransform(intCtx) {
        intCtx.beginPath();
        var v1 = this.p1;
        var v2 = this.p2;
        var viewWall = null;
        //var nextEdge = [];
        if (v1.y <= CANVAS_HEIGHT / 2) {
            //var finalV1 = new Point(((v1.x - CANVAS_WIDTH/2) / (findHypotenuse(v1.x-CANVAS_WIDTH/2, v1.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v1.y);
            var finalV1 = this.transformPoint(v1);
            intCtx.moveTo(finalV1.x, finalV1.y);
            if (v2.y <= CANVAS_HEIGHT / 2) {
                //var finalV2 = new Point(((v2.x - CANVAS_WIDTH/2) / (findHypotenuse(v2.x-CANVAS_WIDTH/2, v2.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v2.y);
                var finalV2 = this.transformPoint(v2);
                //viewVertices.push(finalV2);
                //console.log(finalV2);
                intCtx.lineTo(finalV2.x, finalV2.y);
                //nextEdge.push(numVertices++);
                //nextEdge.push(transMap.edgeArrays[i][2]); 
                //viewEdges.push(nextEdge);
                var wallVector = new Vector(v2.x - v1.x, v2.y - v1.y);
                viewWall = new Wall(this, v1, v2, this.color, { x: wallVector.x / STEP_COUNT, y: wallVector.y / STEP_COUNT });
                intCtx.stroke();
            } else {
                var xDelta = v1.x - v2.x;
                var yDelta = v1.y - v2.y;
                var vector = new Point(xDelta, yDelta);
                vector.normalize();
                //console.log(vector);
                var posVector = new Point(v1.x, v1.y);
                //console.log(v1.x, v1.y);
                var viewAngleInter = viewAngleIntersection(posVector, vector);
                //var finalV2 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / (findHypotenuse(viewAngleInter.x - CANVAS_WIDTH / 2, viewAngleInter.y - CANVAS_HEIGHT / 2))
                //    * this.SCALE + CANVAS_WIDTH/2, viewAngleInter.y);
                var finalV2 = this.transformPoint(viewAngleInter);

                var wallVector = new Vector(viewAngleInter.x - v1.x, viewAngleInter.y - v1.y);
                //viewVertices.push(finalV2);
                //console.log(viewAngleInter);
                intCtx.lineTo(finalV2.x, finalV2.y);
                //nextEdge.push(numVertices++);
                //nextEdge.push(transMap.edgeArrays[i][2]);
                //console.log(transMap.edgeArrays[i][2]);
                //viewEdges.push(nextEdge);
                viewWall = new Wall(this, v1, viewAngleInter, this.color, { x: wallVector.x / STEP_COUNT, y: wallVector.y / STEP_COUNT });
                intCtx.stroke();
                //console.log(viewWall);
            }
        } else {
            if (v2.y <= CANVAS_HEIGHT / 2) {
                //ctx.moveTo(v2.x, v2.y);
                var xDelta = v1.x - v2.x;
                var yDelta = v1.y - v2.y;
                var vector = new Point(xDelta, yDelta);
                vector.normalize();
                //console.log(vector);
                var posVector = new Point(v1.x, v1.y);
                //console.log(v1.x, v1.y);
                var viewAngleInter = viewAngleIntersection(posVector, vector);
                //console.log(viewAngleInter);
                //ctx.lineTo(viewAngleInter.x, viewAngleInter.y);
                //var finalV1 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / (findHypotenuse(viewAngleInter.x - CANVAS_WIDTH / 2, viewAngleInter.y - CANVAS_HEIGHT / 2)) * this.SCALE+CANVAS_WIDTH / 2, viewAngleInter.y);
                var finalV1 = this.transformPoint(viewAngleInter);
                //viewVertices.push(finalV1);
                intCtx.moveTo(finalV1.x, finalV1.y);
                //nextEdge.push(numVertices++);
                var finalV2 = this.transformPoint(v2);
                //viewVertices.push(finalV2);
                intCtx.lineTo(finalV2.x, finalV2.y);
                //nextEdge.push(numVertices++);
                //nextEdge.push(transMap.edgeArrays[i][2]);
                //viewEdges.push(nextEdge);

                var wallVector = new Vector(v2.x - viewAngleInter.x, v2.y - viewAngleInter.y);

                viewWall = new Wall(this, viewAngleInter, v2, this.color, {x: wallVector.x / STEP_COUNT, y: wallVector.y / STEP_COUNT});
                intCtx.stroke();
            }
        }
        //console.log(viewWall);
        if (viewWall != null && ((viewWall.p1.x >= 0 && viewWall.p1.x <= CANVAS_WIDTH) || (viewWall.p2.x >= 0 && viewWall.p2.x <= CANVAS_WIDTH))) return viewWall;
        return null;
    }

    getRotation(matrix) {


        return this.transformWall(matrix);

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

    transformPoint(p) {
        return new Point(PRE_SCALE * -(CANVAS_WIDTH / 2 - p.x) / ((CANVAS_HEIGHT/2 - p.y)) + CANVAS_WIDTH / 2, p.y);
    }

    wallUpper(p) {
        return new Point(p.x, -1000/(CANVAS_HEIGHT/2 - p.y) + CANVAS_HEIGHT/2);
    }

    wallLower(p) {
        return new Point(p.x, 1000 / (CANVAS_HEIGHT/2 - p.y) + CANVAS_HEIGHT/2);
    }
}