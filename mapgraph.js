class MapGraph {
    constructor(vertices, edgeArrays) {
        Object.assign(this, { vertices, edgeArrays});
        this.SCALE = 800;
        this.EXP_SCALE = 20;
        this.EXP_EQ = 2 ** (1 / 200) * 5 ** (1 / 400);
        this.X_CLAMP = 50;

    }

    update() {

    }

    draw(ctx) {
        //console.log(ctx);
        //console.log(this);
        for (var i = 0; i < this.edgeArrays.length; i++) {
            ctx.beginPath();
            ctx.moveTo(this.vertices[this.edgeArrays[i][0]].x, this.vertices[this.edgeArrays[i][0]].y);
            //console.log(vertices[this.edgeArrays[i][j - 1]]);
            //console.log(vertices[this.edgeArrays[i][j]]);
            let v2 = this.vertices[this.edgeArrays[i][1]];
            ctx.lineTo(v2.x, v2.y);
            //console.log(curr);
            ctx.stroke();
        }
    }

    cullAndDraw(player, ctx) {
    //    var playerAngleNormalized = player.direction % 2 * Math.PI;
    //    if (playerAngleNormalized < 0) {
    //        playerAngleNormalized += 2 * Math.PI;
    //    }
    //    var prevVertexValid = false;
    //    for (var i = 0; i < this.edgeArrays.length; i++) {
    //        ctx.beginPath();
    //        let curr = this.vertices[this.edgeArrays[i][0]];
    //        var currXDelta = curr.x-player.x;
    //        var currYDelta = curr.y-player.y;
    //        var playerVector = new Vector(xDelta, yDelta);
    //        playerVector.normalize();
    //        if (getAngle(playerVector) - playerAngleNormalized >= -Math.PI / 2 && getAngle(playerVector) - playerAngleNormalized <= Math.PI / 2) {
    //            prevVertexValid = true;
    //            ctx.moveTo(curr.x, curr.y);
    //        }
    //        ctx.moveTo(this.edgeArrays[i][0].x, this.edgeArrays[i][0].y);
    //        for (var j = 1; j < this.edgeArrays[i].length; j++) {
    //            let prev = curr;
    //            //let prevXDelta = currXDelta;
    //            //let prevYDelta = currYDelta;
    //            curr = vertices[this.edgeArrays[i][j]];
    //            currXDelta = curr.x-player.x;
    //            currYDelta = curr.y-player.y;
    //            playerVector = new Vector(xDelta, yDelta);
    //            playerVector.normalize();
    //            if (getAngle(playerVector) - playerAngleNormalized >= -Math.PI / 2 && getAngle(playerVector) - playerAngleNormalized <= Math.PI / 2 && prevVertexValid) {
    //                prevVertexValid = true;
    //                ctx.lineTo(curr.x, curr.y);
    //            } else if (getAngle(playerVector) - playerAngleNormalized >= -Math.PI / 2 && getAngle(playerVector) - playerAngleNormalized <= Math.PI / 2) {
    //                prevVertexValid = true;
    //                var wallXDelta = curr.x - prev.x;
    //                var wallYDelta = curr.y - prev.y;
    //                var wallVector = new Vector(wallXDelta, wallYDelta);
    //                wallVector.normalize();
    //            }

    //            ctx.lineTo(curr.x, curr.y);
    //        }
    //        ctx.stroke();
    //    }

        
        var transPlayerAndMap = this.transformMap(player, ctx);

        var transPlayer = transPlayerAndMap[0];
        var transMap = transPlayerAndMap[1];
        //console.log(transMap);

        var viewVertices = [];
        var viewEdges = [];

        var numVertices = 0;

        for (var i = 0; i < transMap.edgeArrays.length; i++) {
            ctx.beginPath();
            var v1 = transMap.vertices[transMap.edgeArrays[i][0]];
            var v2 = transMap.vertices[transMap.edgeArrays[i][1]];
            var nextEdge = [];
            //console.log(v1);
            if (v1.y <= CANVAS_HEIGHT / 2) {
                //var finalV1 = new Point(((v1.x - CANVAS_WIDTH/2) / (findHypotenuse(v1.x-CANVAS_WIDTH/2, v1.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v1.y);
                var finalV1 = new Point(((v1.x - CANVAS_WIDTH / 2) / -(v1.y - CANVAS_HEIGHT / 2 - this.X_CLAMP)) * this.SCALE + CANVAS_WIDTH / 2, v1.y);
                ctx.moveTo(finalV1.x, finalV1.y);
                //console.log(v1);
                //console.log(finalV1);
                viewVertices.push(finalV1);
                nextEdge.push(numVertices++);
                if (v2.y <= 400) {
                    //var finalV2 = new Point(((v2.x - CANVAS_WIDTH/2) / (findHypotenuse(v2.x-CANVAS_WIDTH/2, v2.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v2.y);
                    var finalV2 = new Point(((v2.x - CANVAS_WIDTH / 2) / -(v2.y - CANVAS_HEIGHT / 2 - this.X_CLAMP)) * this.SCALE + CANVAS_WIDTH / 2, v2.y);
                    viewVertices.push(finalV2);
                    ctx.lineTo(finalV2.x, finalV2.y);
                    nextEdge.push(numVertices++);
                    nextEdge.push(transMap.edgeArrays[i][2]);
                    viewEdges.push(nextEdge);
                    ctx.stroke();
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
                    var finalV2 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / -(viewAngleInter.y - CANVAS_HEIGHT / 2 - this.X_CLAMP)
                        * this.SCALE + CANVAS_WIDTH / 2, viewAngleInter.y);


                    viewVertices.push(finalV2);
                    //console.log(viewAngleInter);
                    ctx.lineTo(finalV2.x, finalV2.y);
                    nextEdge.push(numVertices++);
                    nextEdge.push(transMap.edgeArrays[i][2]);
                    console.log(transMap.edgeArrays[i][2]);
                    viewEdges.push(nextEdge);
                    ctx.stroke();
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
                    var finalV1 = new Point((viewAngleInter.x - CANVAS_WIDTH / 2) / -(viewAngleInter.y - CANVAS_HEIGHT / 2 - this.X_CLAMP) * this.SCALE + CANVAS_WIDTH / 2, viewAngleInter.y);
                    viewVertices.push(finalV1);
                    ctx.moveTo(finalV1.x, finalV1.y);
                    nextEdge.push(numVertices++);
                    var finalV2 = new Point(((v2.x - CANVAS_WIDTH / 2) / -(v2.y - CANVAS_HEIGHT / 2 - this.X_CLAMP)) * this.SCALE + CANVAS_WIDTH / 2, v2.y);
                    viewVertices.push(finalV2);
                    ctx.lineTo(finalV2.x, finalV2.y);
                    nextEdge.push(numVertices++);
                    nextEdge.push(transMap.edgeArrays[i][2]);
                    viewEdges.push(nextEdge);
                    ctx.stroke();
                }
            }
            //console.log(finalV1);
            //console.log(finalV2);
            //ctx.stroke();
        }
        var viewMap = new MapGraph(viewVertices, viewEdges);

        //console.log(viewMap);
        //viewMap.draw(ctx);

        transPlayer.draw(ctx);

        var threeDCanvas = document.getElementById("final");
        var threeDCtx = threeDCanvas.getContext("2d");
        //console.log(threeDCtx);
        var colors = ["Red", "Blue", "Green"]
        threeDCtx.fillStyle = "Cyan";
        threeDCtx.fillRect(0, 0, 800, 400);
        threeDCtx.fillStyle = "darkgrey";
        threeDCtx.fillRect(0, 400, 800, 400);
        for (var i = 0; i < viewMap.edgeArrays.length; i++) {
            threeDCtx.beginPath();
            var v1 = viewMap.vertices[viewMap.edgeArrays[i][0]];
            var v2 = viewMap.vertices[viewMap.edgeArrays[i][1]];
            //threeDCtx.moveTo(v1.x, 400);
            var p1 = new Point(v1.x, 400 - (this.EXP_EQ) ** v1.y * this.EXP_SCALE);
            var p2 = new Point(v1.x, 400 + (this.EXP_EQ) ** v1.y * this.EXP_SCALE);
            var p3 = new Point(v2.x, 400 + (this.EXP_EQ) ** v2.y * this.EXP_SCALE);
            var p4 = new Point(v2.x, 400 - (this.EXP_EQ) ** v2.y * this.EXP_SCALE);
            threeDCtx.fillStyle = viewMap.edgeArrays[i][2];
            threeDCtx.lineTo(p1.x, p1.y);
            threeDCtx.lineTo(p2.x, p2.y);
            threeDCtx.lineTo(p3.x, p3.y);
            threeDCtx.lineTo(p4.x, p4.y);

            threeDCtx.closePath();
            threeDCtx.fill();
            //if (v1.y === 400) {
            //    threeDCtx.moveTo(v1.x, 400 - (this.EXP_EQ) ** v1.y * this.EXP_SCALE);
            //} else {
            //    threeDCtx.lineTo(v1.x, 400 - (this.EXP_EQ) ** v1.y * this.EXP_SCALE);
            //}
            //threeDCtx.lineTo(v2.x, 400 - (this.EXP_EQ) ** v2.y * this.EXP_SCALE);
            ////threeDCtx.lineTo(v2.x, 400);
            //threeDCtx.closePath();
            //threeDCtx.stroke();
            //threeDCtx.closePath();
            //threeDCtx.fill();
            //threeDCtx.beginPath();

            //threeDCtx.moveTo(v1.x, 400);
            //if (v1.y === 400) {
            //    threeDCtx.moveTo(v1.x, 400 + (this.EXP_EQ) ** v1.y * this.EXP_SCALE);
            //} else {
            //    threeDCtx.lineTo(v1.x, 400 + (this.EXP_EQ) ** v1.y * this.EXP_SCALE);
            //}
            //threeDCtx.lineTo(v2.x, 400 + (this.EXP_EQ) ** v2.y * this.EXP_SCALE);
            //threeDCtx.stroke();
            //threeDCtx.lineTo(v2.x, 400);
            //threeDCtx.closePath();
            //threeDCtx.fill();
        }
    }

    transformMap(player, ctx) {
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = 800;
        tempCanvas.height = 800;
        tempCtx.fillStyle = "Red";
        //tempCtx.fillRect(395, 395, 10, 10);
        tempCtx.fillStyle = "Black";
        //tempCtx.fillRect(470, 612, 20, 20);
        tempCtx.save();
        tempCtx.translate(400, 400);
        tempCtx.rotate(-1 * player.direction - Math.PI / 2);
        tempCtx.translate(-1 * player.x, -1 * player.y);
        var transMat = tempCtx.getTransform();
        //console.log("transMat" + transMat);
        var matArray = [[transMat.m11, transMat.m21, transMat.m41], [transMat.m12, transMat.m22, transMat.m42], [transMat.m13, transMat.m23, transMat.m33]];
        //console.log("matArray" + matArray);
        //console.log(transformedVec);
        //player.draw(tempCtx);
        //this..draw(tempCtx);
        tempCtx.restore();
        var vertices = this.vertices;
        var edges = this.edgeArrays;
        //console.log(edges);
        //var intCan = document.getElementById("intermediate");
        //var intCtx = intCan.getContext("2d");
        var transformedVertices = [];
        //intCtx.beginPath();
        for (var i = 0; i < vertices.length; i++) {
            //tempCtx.beginPath();
            var homogVec = [vertices[i].x, vertices[i].y, 1];
            var transformedVec = matByVec(matArray, homogVec);
            //if (i === 0) {
            //    intCtx.moveTo(transformedVec[0], transformedVec[1]);
            //}
            //else {
            //    intCtx.lineTo(transformedVec[0], transformedVec[1]);
            //    intCtx.fillRect(transformedVec[0], transformedVec[1], 20, 20);
            //}
            transformedVertices.push(new Point(transformedVec[0], transformedVec[1]));
        }
        //intCtx.stroke();

        var playerPos = [player.x, player.y, 1];

        var transformedPlayerPos = matByVec(matArray, playerPos);

        var transformedPlayer = new Player(player.game, transformedPlayerPos[0], transformedPlayerPos[1], -Math.PI / 2);
        var transformedMap = new MapGraph(transformedVertices, edges);
        //console.log(transformedMap);
        return [transformedPlayer, transformedMap];
        //console.log(this.this.);
    }
}