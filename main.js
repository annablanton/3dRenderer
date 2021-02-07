var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 800;
var PRE_SCALE = 50;
var POST_SCALE = 800;

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
    GAME_ENGINE.addEntity(player);
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-18, 0), new Point(0, 0), "Black"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(0, 0), new Point(0, -18), "Red"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(0, -18), new Point(-5, -18), "Blue"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-13, -18), new Point(-18, -18), "Blue"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-13, -18), new Point(-13, -36), "Blue"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-5, -18), new Point(-5, -36), "Blue"));
    GAME_ENGINE.addEntity(new Wall(GAME_ENGINE, new Point(-18, -18), new Point(-18, 0), "Green"));
    GAME_ENGINE.addEntity(new Imp(GAME_ENGINE, -9, -9, Math.PI));

    GAME_ENGINE.start();

});