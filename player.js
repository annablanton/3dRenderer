class Player {
    constructor(game, x, y, direction) {
        var dirVector = new TwoDVector(direction);
        Object.assign(this, { game, direction, dirVector });
        this.x = 2 + x * 4;
        this.y = 2 + y * 4;
        //console.log(this.game);
        this.VECTOR_SCALE = 20;
        this.PLAYER_SIZE = 4;
        this.velocity = { x: 0, y: 0 };
        this.SPEED = 50;
        this.TURN_SPEED = Math.PI / 2;
        this.radius = 1;
        this.spaceReleased = true;

        //this.game.player = this;
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

        if (this.game.space && this.spaceReleased) {
            this.spaceReleased = false;
            this.game.addEntity(new Arrow(this.game, this.x, this.y, this.direction));
            //console.log(this.direction);
        } else if (!this.game.space) {
            this.spaceReleased = true;
        }

        if (this.game.turnLeft && !this.game.turnRight) this.updateDirection(-this.TURN_SPEED * TICK);
        else if (this.game.turnRight && !this.game.turnLeft) {
            this.updateDirection(this.TURN_SPEED * TICK);
        }

        var that = this;

        this.game.entities.forEach(function (entity) {
            if (entity !== that && entity.radius && that.collide(entity)) {
                if (entity instanceof Chicken) {
                    entity.removeFromWorld = true;
                }
            }
        });

        if (this.direction < 0) {
            this.updateDirection(2 * Math.PI - 2 * this.direction);
        } else if (this.direction > 2 * Math.PI) {
            this.updateDirection(-2 * Math.PI);
        }
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    }

    updateDirection(rads) {
        this.direction += rads;
        this.dirVector = new TwoDVector(this.direction);
    }

    collide(other) {
        return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    }

    draw(ctx) {
        this.drawPlayer(ctx);
        this.drawDirection(ctx);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
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