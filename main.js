var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 800;
var PRE_SCALE = 50;
var POST_SCALE = 800;

function getRandomMagnitude(n) {
    return randomInt(n) - n / 2;
}

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/imp.png");
ASSET_MANAGER.queueDownload("./sprites/chickenonaplate-1.png");
ASSET_MANAGER.queueDownload("./sprites/projectiles.png");
ASSET_MANAGER.downloadAll(function () {
    var map = document.getElementById("map");
    map.width = CANVAS_WIDTH;
    map.height = CANVAS_HEIGHT;
    var mapCtx = map.getContext("2d");

    mapCtx.fillStyle = "Black";
    mapCtx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    var GAME_ENGINE = new GameEngine();
    //var mapModel = new Map(GAME_ENGINE, player, mapGraph);
    var intermediate = document.getElementById("intermediate");
    intermediate.height = CANVAS_HEIGHT;
    intermediate.width = CANVAS_WIDTH;
    var intermediateCtx = intermediate.getContext("2d");
    var threeDCanvas = document.getElementById("final");
    var threeDCtx = threeDCanvas.getContext("2d");  
    threeDCanvas.requestPointerLock = threeDCanvas.requestPointerLock ||
        threeDCanvas.mozRequestPointerLock;
    threeDCanvas.onclick = function () {
        threeDCanvas.requestPointerLock();
    }
    threeDCanvas.height = CANVAS_HEIGHT;
    threeDCanvas.width = CANVAS_WIDTH;
    GAME_ENGINE.init(mapCtx, intermediateCtx, threeDCtx);
    new SceneManager(GAME_ENGINE);

    GAME_ENGINE.start();

});