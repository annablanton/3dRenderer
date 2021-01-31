class Wall {
    constructor(game, p1, p2, color) {
        Object.assign(this, { game, p1, p2, color})
    }

    update() {

    }

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

    fpDraw(intCtx, threeDCtx) {


        var transWall = this.transformWall(intCtx);
        intCtx.beginPath();
        var v1 = transWall.p1;
        var v2 = transWall.p2;
        var viewWall = null;
        //var nextEdge = [];
        if (v1.y <= CANVAS_HEIGHT / 2) {
            //var finalV1 = new Point(((v1.x - CANVAS_WIDTH/2) / (findHypotenuse(v1.x-CANVAS_WIDTH/2, v1.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v1.y);
            var finalV1 = new Point(((v1.x - CANVAS_WIDTH / 2) / -(v1.y - CANVAS_HEIGHT / 2 - this.game.X_CLAMP)) * this.game.SCALE + CANVAS_WIDTH / 2, v1.y);
            //console.log(v1);
            //console.log(finalV1);
            //console.log(finalV1);
            intCtx.moveTo(finalV1.x, finalV1.y);
            //console.log(v1);
            //console.log(finalV1);
            //viewVertices.push(finalV1);
            //nextEdge.push(numVertices++);
            if (v2.y <= 400) {
                //var finalV2 = new Point(((v2.x - CANVAS_WIDTH/2) / (findHypotenuse(v2.x-CANVAS_WIDTH/2, v2.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v2.y);
                var finalV2 = new Point(((v2.x - CANVAS_WIDTH / 2) / -(v2.y - CANVAS_HEIGHT / 2 - this.game.X_CLAMP)) * this.game.SCALE + CANVAS_WIDTH / 2, v2.y);
                //viewVertices.push(finalV2);
                //console.log(finalV2);
                intCtx.lineTo(finalV2.x, finalV2.y);
                //nextEdge.push(numVertices++);
                //nextEdge.push(transMap.edgeArrays[i][2]); 
                //viewEdges.push(nextEdge);
                viewWall = new Wall(this, finalV1, finalV2, transWall.color);
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
                var finalV2 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / -(viewAngleInter.y - CANVAS_HEIGHT / 2 - this.game.X_CLAMP)
                    * this.game.SCALE + CANVAS_WIDTH / 2, viewAngleInter.y);


                //viewVertices.push(finalV2);
                //console.log(viewAngleInter);
                intCtx.lineTo(finalV2.x, finalV2.y);
                //nextEdge.push(numVertices++);
                //nextEdge.push(transMap.edgeArrays[i][2]);
                //console.log(transMap.edgeArrays[i][2]);
                //viewEdges.push(nextEdge);
                viewWall = new Wall(this, finalV1, finalV2, transWall.color);
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
                var finalV1 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / -(viewAngleInter.y - CANVAS_HEIGHT / 2 - this.game.X_CLAMP) * this.game.SCALE + CANVAS_WIDTH / 2, viewAngleInter.y);
                //viewVertices.push(finalV1);
                intCtx.moveTo(finalV1.x, finalV1.y);
                //nextEdge.push(numVertices++);
                var finalV2 = new Point(((v2.x - CANVAS_WIDTH / 2) / -(v2.y - CANVAS_HEIGHT / 2 - this.game.X_CLAMP)) * this.game.SCALE + CANVAS_WIDTH / 2, v2.y);
                //viewVertices.push(finalV2);
                intCtx.lineTo(finalV2.x, finalV2.y);
                //nextEdge.push(numVertices++);
                //nextEdge.push(transMap.edgeArrays[i][2]);
                //viewEdges.push(nextEdge);

                viewWall = new Wall(this, finalV1, finalV2, transWall.color);
                intCtx.stroke();
            }
        }
            //console.log(finalV1);
            //console.log(finalV2);
            //ctx.stroke();
        //}

        //for (var i = 0; i < transEntities; i++) {
        //    if (transEntities[i].y <= CANVAS_HEIGHT / 2) {
        //        var p = new Point(((transEntities[i].x - CANVAS_WIDTH / 2) / -(transEntities[i].y - CANVAS_HEIGHT / 2 - this.X_CLAMP)) * this.SCALE + CANVAS_WIDTH / 2, transEntities[i].y);
        //        intCtx.fillRect(p.x - 2, p.y - 2, 4, 4);
        //        viewEntities.push(new transEntities[i].constructor(this, p.x, p.y));
        //    }
        //}
        //var viewMap = new MapGraph(viewVertices, viewEdges);

        //console.log(viewMap);
        //viewMap.draw(ctx);

        //uncomment from here
        //transPlayer.draw(intCtx);

        //console.log(threeDCtx);
        //var colors = ["Red", "Blue", "Green"]
        //for (var i = 0; i < viewWalls.length; i++) {
        if (viewWall != null) {
            threeDCtx.beginPath();
            var v1 = viewWall.p1;
            var v2 = viewWall.p2;
            //threeDCtx.moveTo(v1.x, 400);
            var p1 = new Point(v1.x, 400 - (this.game.EXP_EQ) ** v1.y * this.game.EXP_SCALE);
            var p2 = new Point(v1.x, 400 + (this.game.EXP_EQ) ** v1.y * this.game.EXP_SCALE);
            var p3 = new Point(v2.x, 400 + (this.game.EXP_EQ) ** v2.y * this.game.EXP_SCALE);
            var p4 = new Point(v2.x, 400 - (this.game.EXP_EQ) ** v2.y * this.game.EXP_SCALE);
            threeDCtx.fillStyle = viewWall.color;
            threeDCtx.lineTo(p1.x, p1.y);
            threeDCtx.lineTo(p2.x, p2.y);
            threeDCtx.lineTo(p3.x, p3.y);
            threeDCtx.lineTo(p4.x, p4.y);

            threeDCtx.closePath();
            threeDCtx.fill();
        }
    }

    transformWall(ctx) {
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = 800;
        tempCanvas.height = 800;
        tempCtx.fillStyle = "Red";
        tempCtx.fillStyle = "Black";
        tempCtx.save();
        tempCtx.translate(400, 400);
        tempCtx.rotate(-1 * this.game.player.direction - Math.PI / 2);
        tempCtx.translate(-1 * this.game.player.x, -1 * this.game.player.y);
        var transMat = tempCtx.getTransform();
        var matArray = [[transMat.m11, transMat.m21, transMat.m41], [transMat.m12, transMat.m22, transMat.m42], [transMat.m13, transMat.m23, transMat.m33]];
        tempCtx.restore();
        var homogVec1 = [this.p1.x, this.p1.y, 1];
        var transformedVec1 = matByVec(matArray, homogVec1);

        var homogVec2 = [this.p2.x, this.p2.y, 1];
        var transformedVec2 = matByVec(matArray, homogVec2);
        return new Wall(this, transformedVec1, transformedVec2, this.color);
    }
}