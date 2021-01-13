class Player {
    constructor(game, x, y, direction) {
        var dirVector = new TwoDVector(direction);
        Object.assign(this, { game, x, y, direction, dirVector });
        //console.log(this.game);
        this.VECTOR_SCALE = 20;
        this.PLAYER_SIZE = 4;
        this.velocity = { x: 0, y: 0 };
        this.SPEED = 200;
        this.TURN_SPEED = 2 * Math.PI;

        this.game.player = this;
    }

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        const TICK = this.game.clockTick;
        if (this.game.up && !this.game.down) {
            this.velocity.y += Math.sin(this.direction) * this.SPEED;
            this.velocity.x += Math.cos(this.direction) * this.SPEED;
        } else if (this.game.down && !this.game.up) {
            this.velocity.y += -Math.sin(this.direction) * this.SPEED;
            this.velocity.x += -Math.cos(this.direction) * this.SPEED;
        } else {
            this.velocity.y += 0;
            this.velocity.x += 0;
        }
        if (this.game.right && !this.game.left) {
            this.velocity.y += Math.sin(this.direction + Math.PI / 2) * this.SPEED;
            this.velocity.x += Math.cos(this.direction + Math.PI / 2) * this.SPEED;
        } else if (this.game.left && !this.game.right) {
            this.velocity.y += Math.sin(this.direction - Math.PI / 2) * this.SPEED;
            this.velocity.x += Math.cos(this.direction - Math.PI / 2) * this.SPEED;
        } else {
            this.velocity.x += 0;
            this.velocity.y += 0;
        }

        if (this.game.turnLeft && !this.game.turnRight) this.updateDirection(-this.TURN_SPEED * TICK);
        else if (this.game.turnRight && !this.game.turnLeft) {
            this.updateDirection(this.TURN_SPEED * TICK);
        }
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    }

    updateDirection(rads) {
        this.direction += rads;
        this.dirVector = new TwoDVector(this.direction);
    }

    draw(ctx) {
        this.drawPlayer(ctx);
        this.drawDirection(ctx);
    }

    drawPlayer(ctx) {
        ctx.fillRect(this.x-(this.PLAYER_SIZE/2), this.y-(this.PLAYER_SIZE/2), this.PLAYER_SIZE, this.PLAYER_SIZE);
    }

    drawDirection(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (this.dirVector.x * this.VECTOR_SCALE), this.y + (this.dirVector.y * this.VECTOR_SCALE));
        ctx.stroke();
    }


}