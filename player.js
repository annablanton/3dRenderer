class Player {
    constructor(game, x, y, direction) {
        var dirVector = new TwoDVector(direction);
        Object.assign(this, { game, direction, dirVector });
        this.xArr = x;
        this.yArr = y;
        this.x = 1 + x * 2;
        this.y = 1 + y * 2;
        //console.log(this.game);
        this.VECTOR_SCALE = 20;
        this.PLAYER_SIZE = 4;
        this.velocity = { x: 0, y: 0 };
        this.SPEED = 6;
        this.TURN_SPEED = Math.PI / 2;
        this.radius = 1;
        this.clickReleased = true;
        this.occupied = this.game.dungeon[this.yArr][this.xArr];
        this.occupied.enter();
        console.log(this.game.dungeon[this.yArr][this.xArr]);
        this.destination = new Point(this.x, this.y);
        this.health = 100;
        this.fireTimer = 0;

        this.upReleased = true;
        this.downReleased = true;
        this.rightReleased = true;
        this.leftReleased = true;

        //this.game.player = this;
    }

    update() {
        if (this.health < 0) this.health = 0;
        if (this.health > 0) {
            this.velocity.x = 0;
            this.velocity.y = 0;



            const TICK = this.game.clockTick;
            if (!this.moving) {
                if (this.game.up && !this.game.down && this.upReleased) {
                    this.up();
                    this.upReleased = false;
                } else if (this.game.down && !this.game.up && this.downReleased) {
                    this.down();
                    this.downReleased = false;
                } else if (this.game.right && !this.game.left && this.rightReleased) {
                    this.right();
                    this.rightReleased = false;
                } else if (this.game.left && !this.game.right && this.leftReleased) {
                    this.left();
                    this.leftReleased = false;
                }
                if (!this.game.up) this.upReleased = true;
                if (!this.game.down) this.downReleased = true;
                if (!this.game.left) this.leftReleased = true;
                if (!this.game.right) this.rightReleased = true;
            }

            if (this.destination.x < this.x) {
                this.x -= this.SPEED * this.game.clockTick;
                if (this.destination.x >= this.x) {
                    this.x = this.destination.x;
                    this.occupied.leave();
                    this.xArr--;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            } else if (this.destination.x > this.x) {
                this.x += this.SPEED * this.game.clockTick;
                if (this.destination.x < this.x) {
                    this.x = this.destination.x;
                    this.occupied.leave();
                    this.xArr++;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            } else if (this.destination.y < this.y) {
                this.y -= this.SPEED * this.game.clockTick;
                if (this.destination.y > this.y) {
                    this.y = this.destination.y;
                    this.occupied.leave();
                    this.yArr--;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            } else if (this.destination.y > this.y) {
                this.y += this.SPEED * this.game.clockTick;
                if (this.destination.y < this.y) {
                    this.y = this.destination.y;
                    this.occupied.leave();
                    this.yArr++;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            }
            //console.log(this.game.clickReleased);

            if (this.game.click && this.clickReleased && !this.fireTimer) {
                this.clickReleased = false;
                this.game.addEntity(new Arrow(this.game, this.x, this.y, this.direction));
                //console.log(this.direction);
                this.fireTimer = 1;
            } else if (!this.game.click) {
                this.clickReleased = true;
            }

            if (this.fireTimer > 0) {
                this.fireTimer -= this.game.clockTick;
                if (this.fireTimer < 0) this.fireTimer = 0;
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
    }

    up() {
        this.moving = true;
        if (this.direction <= Math.PI / 4 || this.direction >= 7 * Math.PI / 4) {
            this.east();
        } else if (this.direction <= 3 * Math.PI / 4) {
            this.south();
        } else if (this.direction <= 5 * Math.PI / 4) {
            this.west();
        } else if (this.direction <= 7 * Math.PI / 4) {
            this.north();
        } else {
            this.moving = false;
        }
    }

    right() {
        this.moving = true;
        if (this.direction <= Math.PI / 4 || this.direction >= 7 * Math.PI / 4) {
            this.south();
        } else if (this.direction <= 3 * Math.PI / 4) {
            this.west();
        } else if (this.direction <= 5 * Math.PI / 4) {
            this.north();
        } else if (this.direction <= 7 * Math.PI / 4) {
            this.east();
        } else {
            this.moving = false;
        }
    }

    down() {
        this.moving = true;
        if (this.direction <= Math.PI / 4 || this.direction >= 7 * Math.PI / 4) {
            this.west();
        } else if (this.direction <= 3 * Math.PI / 4) {
            this.north();
        } else if (this.direction <= 5 * Math.PI / 4) {
            this.east();
        } else if (this.direction <= 7 * Math.PI / 4) {
            this.south();
        } else {
            this.moving = false;
        }
    }

    left() {
        this.moving = true;
        if (this.direction <= Math.PI / 4 || this.direction >= 7 * Math.PI / 4) {
            this.north();
        } else if (this.direction <= 3 * Math.PI / 4) {
            this.east();
        } else if (this.direction <= 5 * Math.PI / 4) {
            this.south();
        } else if (this.direction <= 7 * Math.PI / 4) {
            this.west();
        } else {
            this.moving = false;
        }
    }

    north() {
        if (!this.occupied.top && this.yArr - 1 >= 0 && !this.game.dungeon[this.yArr - 1][this.xArr].occupied) {
            this.destination = new Point(this.x, this.y - 2);
            this.game.dungeon[this.yArr - 1][this.xArr].enter();
        } else {
            this.moving = false;
        }
    }

    east() {
        if (!this.occupied.right && this.xArr + 1 < this.game.dungeon[this.yArr].length && !this.game.dungeon[this.yArr][this.xArr + 1].occupied) {
            this.destination = new Point(this.x + 2, this.y);
            this.game.dungeon[this.yArr][this.xArr + 1].enter();
        } else {
            this.moving = false;
        }
    }

    south() {
        if (!this.occupied.bottom && this.yArr + 1 < this.game.dungeon.length && !this.game.dungeon[this.yArr + 1][this.xArr].occupied) {
            this.destination = new Point(this.x, this.y + 2);
            this.game.dungeon[this.yArr + 1][this.xArr].enter();
        } else {
            this.moving = false;
        }
    }

    west() {
        if (!this.occupied.left && this.xArr - 1 >= 0 && !this.game.dungeon[this.yArr][this.xArr - 1].occupied) {
            this.destination = new Point(this.x - 2, this.y);
            this.game.dungeon[this.yArr][this.xArr - 1].enter();
        } else {
            this.moving = false;
        }
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