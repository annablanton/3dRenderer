class Intermediate {
    constructor(game, player, mapGraph) {
        Object.assign(this, { game, mapGraph });
        //this.transformMap();
        //console.log(this.mapGraph);
    }

    update() {

    }

    draw(ctx) {
        //this.player.draw(ctx);
        //this.mapGraph.draw(ctx);
        //console.log(this.mapGraph.vertices);
        //this.mapGraph.cullAndDraw(this.player, ctx);
        this.transformMap(ctx);
    }

    transformMap(ctx) {
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
        //this.mapGraph.draw(tempCtx);
        tempCtx.restore();
        var vertices = this.mapGraph.vertices;
        var edges = this.mapGraph.edgeArrays;
        //console.log(edges);
        var intCan = document.getElementById("intermediate");
        var intCtx = intCan.getContext("2d");
        var transformedVertices = [];
        intCtx.beginPath();
        for (var i = 0; i < vertices.length; i++) {
            tempCtx.beginPath();
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
        intCtx.stroke();

        var playerPos = [player.x, player.y, 1];

        var transformedPlayerPos = matByVec(matArray, playerPos);

        var transformedPlayer = new Player(this.game, transformedPlayerPos[0], transformedPlayerPos[1], -Math.PI / 2);
        var transformedMap = new MapGraph(transformedVertices, edges);
        transformedPlayer.draw(ctx);
        transformedMap.cullAndDraw(transformedPlayer, ctx);
        //console.log(this.this.mapGraph);
        var threeDCanvas = document.getElementById("3dCanvas");
        var threeDCtx = threeDCanvas.getContext("2d");
        var colors = ["Red", "Blue", "Green"]
        for (var i = 0; i < transformedMap.edgeArrays.length; i++) {
            console.log("a");
            threeDCtx.beginPath();
            threeDCtx.fillStyle(colors[i % 3]);
            var v1 = transformedMap.vertices[transformedMap.edgeArrays[i][0]];
            var v2 = transformedMap.vertices[transformedMap.edgeArrays[i][1]];
            threeDCtx.moveTo(v1.x, 400);
            threeDCtx.lineTo(v1.x, v1.y);
            threeDCtx.lineTo(v2.x, v2.y);
            threeDCtx.stroke();
            threeDCtx.beginPath();
            threeDCtx.moveTo(v1.x, 400);
            threeDCtx.lineTo(v1.x, 800 - v2.y);
            threeDCtx.lineTo(v2.x, 800 - v2.y);
            threeDCtx.stroke();
        }
    }
}