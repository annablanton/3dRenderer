var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 800;

function getRandomMagnitude(n) {
    return randomInt(n) - n / 2;
}

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/imp.png");
ASSET_MANAGER.downloadAll(function () {
    var map = document.getElementById("map");
    map.width = CANVAS_WIDTH;
    map.height = CANVAS_HEIGHT;
    var mapCtx = map.getContext("2d");

    mapCtx.fillStyle = "Black";
    mapCtx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    //var vertices = [new Point(-300, 0), new Point(-150, -100), new Point(50, 0), new Point(100, 300), new Point(-300, 200)];
    //var mapGraph = new MapGraph(vertices, [[0, 1, "Black"], [1, 2, "Red"], [2, 3, "Blue"], [3, 4, "Green"]]);

    //var vertices = [new Point(getRandomMagnitude(1000), getRandomMagnitude(1000)), new Point(getRandomMagnitude(1000),
    //    getRandomMagnitude(1000)), new Point(getRandomMagnitude(1000), getRandomMagnitude(1000)),
    //    new Point(getRandomMagnitude(1000), getRandomMagnitude(1000)), new Point(getRandomMagnitude(1000), getRandomMagnitude(1000))];
    //var mapGraph = new MapGraph(vertices, [[0, 1], [1, 2], [2, 3], [3, 4]]);

    //var vertices = [new Point(200, 200), new Point(300, 300)]
    //var mapGraph = new MapGraph(vertices, [[0, 1]]);

    var GAME_ENGINE = new GameEngine();
    var player = new Player(GAME_ENGINE, -100, 100, 0);
    //var mapModel = new Map(GAME_ENGINE, player, mapGraph);
    var intermediate = document.getElementById("intermediate");
    intermediate.height = CANVAS_HEIGHT;
    intermediate.width = CANVAS_WIDTH;
    var intermediateCtx = intermediate.getContext("2d");
    var threeDCanvas = document.getElementById("final");
    var threeDCtx = threeDCanvas.getContext("2d");  
    threeDCanvas.height = CANVAS_HEIGHT;
    threeDCanvas.width = CANVAS_WIDTH;
    GAME_ENGINE.init(mapCtx, intermediateCtx, threeDCtx);
    //GAME_ENGINE.addEntity(mapGraph);
    GAME_ENGINE.addEntity(player);
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-300, 0), new Point(-150, -100), "Black"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-150, -100), new Point(50, 0), "Red"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(50, 0), new Point(100, 300), "Blue"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(100, 300), new Point(-300, 200), "Green"));
    GAME_ENGINE.addEntity(new Imp(GAME_ENGINE, 200, 100, Math.PI));
    //player.draw(mapCtx);
    //mapModel.draw(mapCtx);

    //var intermediateModel = new Intermediate(GAME_ENGINE, player, mapGraph);

    //intermediateModel.draw(intermediateCtx);

    GAME_ENGINE.start();

    //var mat = new DOMMatrix();
    //mat.translateSelf(400, 400);
    //mat.rotateSelf(-1 * mapModel.player.direction - Math.PI / 2);
    //mat.translateSelf(-1 * mapModel.player.x, -1 * mapModel.player.y);
    //console.log(mat);
    //var matArray = [[mat.m11, mat.m21, mat.m41], [mat.m12, mat.m22, mat.m42], [mat.m13, mat.m23, mat.m33]];
    //var homogPoint = [-300, 0, 1];
    //var transformedPoint = matByVec(matArray, homogPoint);
    //tempCtx.fillRect(transformedPoint[0], transformedPoint[1], 20, 20);   
});