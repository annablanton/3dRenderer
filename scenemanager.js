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
        threeDCtx.fillStyle = "Black";
        threeDCtx.fillRect(CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT - 40, 100, 2);
        threeDCtx.fillRect(CANVAS_WIDTH / 2 - 55, CANVAS_HEIGHT - 40, 5, 14);
        threeDCtx.fillRect(CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT - 28, 100, 2);
        threeDCtx.fillRect(CANVAS_WIDTH / 2 + 50, CANVAS_HEIGHT - 40, 5, 14);
        threeDCtx.fillStyle = "Green";
        threeDCtx.fillRect(CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT - 38, this.player.health, 10);
        threeDCtx.fillStyle = "Purple";
        threeDCtx.save();
        threeDCtx.globalAlpha = 0.5;
        threeDCtx.fillRect(CANVAS_WIDTH / 2 - 25, CANVAS_HEIGHT - 55, this.player.fireTimer * 50, 10);
        threeDCtx.restore();
    }

    update() {
    }

    draw(ctx) {

    }
}