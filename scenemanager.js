class SceneManager {
    constructor(game) {
        this.game = game;
        this.player = new Player(game, -100, 100, 0);
        this.game.hud = this;

        game.addEntity(new Wall(game, new Point(-18, 0), new Point(0, 0), "Black"));
        game.addEntity(new Wall(game, new Point(0, 0), new Point(0, -18), "Red"));
        game.addEntity(new Wall(game, new Point(0, -18), new Point(-5, -18), "Blue"));
        game.addEntity(new Wall(game, new Point(-13, -18), new Point(-18, -18), "Blue"));
        game.addEntity(new Wall(game, new Point(-13, -18), new Point(-13, -36), "Blue"));
        game.addEntity(new Wall(game, new Point(-5, -18), new Point(-5, -36), "Blue"));
        game.addEntity(new Wall(game, new Point(-18, -18), new Point(-18, 0), "Green"));
        game.addEntity(new Imp(game, -9, -9, Math.PI));
        game.addEntity(new Chicken(game, 5, 5));
        game.addEntity(this.player);
        game.addEntity(this);

    };

    getTransform(intCtx, matrix) {

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