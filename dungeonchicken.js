class DungeonChicken {
    constructor(game, x, y) {
        this.game = game;
        this.xArr = x;
        this.yArr = y;
        this.x = 1 + 2 * x;
        this.y = 1 + 2 * y;
        this.radius = 0.5;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/chickenonaplate-1.png");
        this.animations = new Animator(this.spritesheet, 0, 48, 192, 120, 1, 0.2, 1, false, true);
        this.p1 = new Point(this.x + this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y + this.radius * Math.sin(this.game.player.direction + Math.PI / 2));
        this.p2 = new Point(this.x - this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y - this.radius * Math.sin(this.game.player.direction + Math.PI / 2));
        this.constructor3D = Chicken;
    }

    update() {
        if (this.collide(this.game.player)) {
            this.game.player.health = Math.min(this.game.player.health + 10, 100);
            this.removeFromWorld = true;
        }
    }

    collide(other) {
        return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }
}