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

    getTransform(intCtx) {


        var transWall = this.transformWall(intCtx);
        intCtx.beginPath();
        var v1 = transWall.p1;
        var v2 = transWall.p2;
        var viewWall = null;
        //var nextEdge = [];
        if (v1.y <= CANVAS_HEIGHT / 2) {
            //var finalV1 = new Point(((v1.x - CANVAS_WIDTH/2) / (findHypotenuse(v1.x-CANVAS_WIDTH/2, v1.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v1.y);
            var finalV1 = this.transformPoint(v1);
            //console.log(v1);
            //console.log(finalV1);
            //console.log(finalV1);
            intCtx.moveTo(finalV1.x, finalV1.y);
            //console.log(v1);
            //console.log(finalV1);
            //viewVertices.push(finalV1);
            //nextEdge.push(numVertices++);
            if (v2.y <= CANVAS_HEIGHT / 2) {
                //var finalV2 = new Point(((v2.x - CANVAS_WIDTH/2) / (findHypotenuse(v2.x-CANVAS_WIDTH/2, v2.y-CANVAS_HEIGHT/2))) * this.SCALE + CANVAS_WIDTH/2, v2.y);
                var finalV2 = this.transformPoint(v2);
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
                var finalV2 = this.transformPoint(viewAngleInter);


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

                viewWall = new Wall(this, finalV1, finalV2, transWall.color);
                intCtx.stroke();
            }
        }

        return viewWall;

    }

    fpDraw(threeDCtx) {
        threeDCtx.beginPath();
        var v1 = this.p1;
        var v2 = this.p2;
        //threeDCtx.moveTo(v1.x, 400);
        var p1 = this.wallUpper(v1);
        var p2 = this.wallLower(v1);
        var p3 = this.wallLower(v2);
        var p4 = this.wallUpper(v2);
        threeDCtx.fillStyle = this.color;
        threeDCtx.lineTo(500 / 6 * (p1.x - CANVAS_WIDTH/2) + CANVAS_WIDTH/2, p1.y);
        threeDCtx.lineTo(500 / 6 * (p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p2.y);
        threeDCtx.lineTo(500 / 6 * (p3.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p3.y);
        threeDCtx.lineTo(500 / 6 * (p4.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2, p4.y);

        threeDCtx.closePath();
        threeDCtx.fill();
    }

    transformWall(ctx) {
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = 800;
        tempCanvas.height = 800;
        tempCtx.fillStyle = "Red";

        tempCtx.fillStyle = "Black";
        tempCtx.save();
        tempCtx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
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

    transformPoint(p) {
        return new Point(6 * -(CANVAS_WIDTH / 2 - p.x) / (400 - p.y + 2) + CANVAS_WIDTH / 2, p.y);
    }

    wallUpper(p) {
        return new Point(p.x, -1000/(CANVAS_HEIGHT/2 - p.y + 2) + CANVAS_HEIGHT/2);
    }

    wallLower(p) {
        return new Point(p.x, 1000 / (CANVAS_HEIGHT/2 - p.y + 2) + CANVAS_HEIGHT/2);
    }
}