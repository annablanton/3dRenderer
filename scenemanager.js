class SceneManager {
    constructor(game) {
        this.game = game;
        this.player = new Player(game, 0, 17, 0);
        this.game.hud = this;
        game.addEntity(this.player);

        game.addEntity(new DungeonWall(game, 0, 0, 'x', 21, "Red"));
        game.addEntity(new DungeonWall(game, 21, 0, 'y', 9, "Red"));
        game.addEntity(new DungeonWall(game, 21, 12, 'y', 21, "Red"));
        game.addEntity(new DungeonWall(game, 21, 9, 'x', 31, "Red"));
        game.addEntity(new DungeonWall(game, 21, 12, 'x', 25, "Red"));
        game.addEntity(new DungeonWall(game, 27, 12, 'x', 31, "Red"));
        game.addEntity(new DungeonWall(game, 27, 12, 'y', 21, "Red"));
        game.addEntity(new DungeonWall(game, 25, 12, 'y', 21, "Red"));
        game.addEntity(new DungeonWall(game, 31, 12, 'y', 21, "Red"));
        game.addEntity(new DungeonWall(game, 31, 9, 'y', 0, "Red"));
        game.addEntity(new DungeonWall(game, 31, 0, 'x', 52, "Red"));
        game.addEntity(new DungeonWall(game, 52, 0, 'y', 21, "Green"));
        game.addEntity(new DungeonWall(game, 31, 21, 'x', 40, "Green"));
        game.addEntity(new DungeonWall(game, 43, 21, 'x', 52, "Green"));
        game.addEntity(new DungeonWall(game, 40, 21, 'y', 25, "Green"));
        game.addEntity(new DungeonWall(game, 40, 27, 'y', 31, "Green"));
        game.addEntity(new DungeonWall(game, 43, 21, 'y', 31, "Green"));
        game.addEntity(new DungeonWall(game, 43, 31, 'x', 52, "Green"));
        game.addEntity(new DungeonWall(game, 40, 31, 'x', 31, "Green"));
        game.addEntity(new DungeonWall(game, 52, 31, 'y', 52, "Green"));
        game.addEntity(new DungeonWall(game, 31, 31, 'y', 40, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 31, 43, 'y', 52, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 31, 40, 'x', 27, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 27, 40, 'y', 31, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 25, 40, 'x', 21, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 25, 40, 'y', 31, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 21, 43, 'x', 31, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 21, 43, 'y', 52, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 21, 52, 'x', 0, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 21, 40, 'y', 31, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 31, 52, 'x', 52, "DarkOrange"));
        game.addEntity(new DungeonWall(game, 21, 21, 'x', 12, "Blue"));
        game.addEntity(new DungeonWall(game, 9, 21, 'x', 0, "Blue"));
        game.addEntity(new DungeonWall(game, 0, 21, 'y', 0, "Blue"));
        game.addEntity(new DungeonWall(game, 9, 21, 'y', 31, "Blue"));
        game.addEntity(new DungeonWall(game, 12, 21, 'y', 25, "Blue"));
        game.addEntity(new DungeonWall(game, 12, 27, 'y', 31, "Blue"));
        game.addEntity(new DungeonWall(game, 12, 25, 'x', 21, "Blue"));
        game.addEntity(new DungeonWall(game, 12, 27, 'x', 21, "Blue"));
        game.addEntity(new DungeonWall(game, 12, 31, 'x', 21, "Blue"));
        game.addEntity(new DungeonWall(game, 9, 31, 'x', 0, "Blue"));
        game.addEntity(new DungeonWall(game, 0, 31, 'y', 52, "Blue"));
        game.addEntity(new DungeonWall(game, 21, 27, 'y', 31, "Purple"));
        game.addEntity(new DungeonWall(game, 21, 25, 'y', 21, "Purple"));
        game.addEntity(new DungeonWall(game, 21, 21, 'x', 25, "Purple"));
        game.addEntity(new DungeonWall(game, 27, 21, 'x', 31, "Purple"));
        game.addEntity(new DungeonWall(game, 31, 21, 'y', 25, "Purple"));
        game.addEntity(new DungeonWall(game, 31, 27, 'y', 31, "Purple"));
        game.addEntity(new DungeonWall(game, 31, 31, 'x', 27, "Purple"));
        game.addEntity(new DungeonWall(game, 25, 31, 'x', 21, "Purple"));
        game.depthFirstSearch({ x: 0, y: 0 });
        //game.addEntity(new DungeonImp(game, 5, 5, Math.PI));
        game.addEntity(new DungeonChicken(game, 3, 3));

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