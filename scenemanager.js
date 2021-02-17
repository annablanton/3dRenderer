class SceneManager {
    constructor(game) {
        this.game = game;
        this.player = new Player(game, 0, 17, 0);
        this.game.hud = this;
        game.addEntity(this.player);

        game.addEntity(new DungeonWall(game, 0, 18, 'x', 9, "Black"));
        game.addEntity(new DungeonWall(game, 9, 18, 'y', 9, "Red"));
        game.addEntity(new DungeonWall(game, 9, 9, 'x', 7, "Blue"));
        game.addEntity(new DungeonWall(game, 3, 9, 'x', 0, "Blue"));
        game.addEntity(new DungeonWall(game, 3, 9, 'y', 0, "Blue"));
        game.addEntity(new DungeonWall(game, 7, 9, 'y', 0, "Blue"));
        game.addEntity(new DungeonWall(game, 0, 9, 'y', 18, "Green"));
        game.addEntity(new DungeonImp(game, 5, 5, Math.PI));
        //game.addEntity(new Chicken(game, 5, 5));

    };

    getRotation(matrix) {

    }

    getTransform(intCtx) {

    }

    fpDraw(threeDCtx) {
        threeDCtx.fillStyle = "Purple";
        threeDCtx.fillRect(CANVAS_WIDTH / 2 - 3, CANVAS_HEIGHT / 2 - 3, 6, 6);
    }

    update() {
    }

    draw(ctx) {

    }
}