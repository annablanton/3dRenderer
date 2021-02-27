class Arrow {
    constructor(game, x, y, direction) {
        Object.assign(this, { game, x, y, direction});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles.png");
        //console.log(this.direction);
        //console.log(this.spritesheet);
        
        this.radius = 0.1;
        this.p1 = new Point(this.x - this.radius, this.y);
        this.p2 = new Point(this.x + this.radius, this.y);
        var wallVector = new Vector(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.testWall = new Wall(this.game, this.p1, this.p2, 'Black', { x: wallVector.x / STEP_COUNT, y: wallVector.y / STEP_COUNT });

        this.action = 0; //0 = walk, 1 = fire, 2 = die
        this.animations = [];
        this.lifetime = 20;
        this.timeElapsed = 0;
        this.SCALE = 600;
        this.SPEED = 100;



        for (var i = 0; i < 3; i++) {
            this.animations.push([]);
        }
        this.animations[0].push(new Animator(this.spritesheet, 153, 0, 10, 8, 1, 0.2, 1, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 165, 0, 39, 8, 1, 0.2, 1, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 206, 0, 59, 8, 1, 0.2, 1, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 267, 0, 39, 8, 1, 0.2, 1, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 0, 0, 9, 8, 1, 0.2, 1, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 11, 0, 39, 8, 1, 0.2, 1, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 51, 0, 59, 8, 1, 0.2, 1, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 112, 0, 39, 8, 1, 0.2, 1, true, true));
    }

    update() {
        this.timeElapsed += this.game.clockTick;
        if (this.timeElapsed > this.lifetime) {
            this.removeFromWorld = true;
        }
        this.lastLocation = new Point(this.x, this.y);
        this.updateX(this.x + this.game.clockTick * this.SPEED * Math.cos(this.direction));
        this.updateY(this.y + this.game.clockTick * this.SPEED * Math.sin(this.direction));

        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity !== that && entity.radius && that.collide(entity)) {
                if (entity instanceof DungeonImp) {
                    that.removeFromWorld = true;
                    entity.health -= 2;
                }
            }

            if (entity && entity !== that && entity.lineCollision && that.collide(entity)) {
                that.removeFromWorld = true;
            }
        })
    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }

    updateX(x) {
        this.x = x;
        this.p1.x = this.x + this.radius * Math.cos(this.game.player.direction + Math.PI / 2);
        this.p2.x = this.x - this.radius * Math.cos(this.game.player.direction + Math.PI / 2);
    }

    updateY(y) {
        this.y = y;
        this.p1.y = this.y + this.radius * Math.sin(this.game.player.direction + Math.PI / 2)
        this.p2.y = this.y - this.radius * Math.sin(this.game.player.direction + Math.PI / 2)
    }

    collide(other) {
        if (other.radius) return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius
            || distance(this.x - this.SPEED * this.game.clockTick * Math.cos(this.direction) / 2, this.y - this.SPEED * this.game.clockTick * Math.sin(this.direction) / 2, other.x, other.y) < this.radius + other.radius;
        if (other.lineCollision) {
            var lineVector = new Vector(other.p2.x - other.p1.x, other.p2.y - other.p1.y);
            var perpendicularAngle = Math.atan2(lineVector.y, lineVector.x) + Math.PI / 2;
            var normalVector = new Vector(Math.cos(perpendicularAngle), Math.sin(perpendicularAngle));

            var smallerX = Math.min(other.p1.x, other.p2.x);
            var largerX = Math.max(other.p1.x, other.p2.x);

            var smallerY = Math.min(other.p1.y, other.p2.y);
            var largerY = Math.max(other.p1.y, other.p2.y);

            var arrowSmallerX = Math.min(this.x, this.lastLocation.x);
            var arrowLargerX = Math.max(this.x, this.lastLocation.x);
            var arrowSmallerY = Math.min(this.y, this.lastLocation.y);
            var arrowLargerY = Math.max(this.y, this.lastLocation.y);
            var closestPointOnLine = findIntersect(new Point(this.x, this.y), other.p2, normalVector, lineVector);
            var arrowWallIntersect = findIntersect(new Point(this.x, this.y), other.p2, new Vector(Math.cos(this.direction), Math.sin(this.direction)), lineVector);
            return (distance(this.x, this.y, closestPointOnLine.x, closestPointOnLine.y) < this.radius && closestPointOnLine.x <= largerX && closestPointOnLine.x >= smallerX
                && closestPointOnLine.y <= largerY && closestPointOnLine.y >= smallerY)
                || (arrowWallIntersect.x >= smallerX && arrowWallIntersect.x <= largerX && arrowWallIntersect.y >= smallerY && arrowWallIntersect.y <= largerY
                    && arrowWallIntersect.x >= arrowSmallerX && arrowWallIntersect.x <= arrowLargerX && arrowWallIntersect.y >= arrowSmallerY && arrowWallIntersect.y <= arrowLargerY);
        }
    }

    getRotation(matrix) {
        return transformEntity(this.game, this, matrix, Arrow);
    }

    getTransform(intCtx) {
        if (this.y <= CANVAS_HEIGHT / 2) {
            intCtx.fillRect(PRE_SCALE * -(CANVAS_WIDTH / 2 - this.x) / ((400 - this.y)) + CANVAS_WIDTH / 2 - 2, this.y - 2, 4, 4);

            var playerImpVector = new Vector(this.game.player.x - this.x, this.game.player.y - this.y);
            playerImpVector.normalize();
            console.log(this.direction);
            //return new Arrow(this.game, PRE_SCALE * -(CANVAS_WIDTH / 2 - this.x) / ((400 - this.y) + 2) + CANVAS_WIDTH / 2, this.y,
            //    this.direction, this.animations);
            return new Arrow(this.game, this.x, this.y,
                this.direction, this.animations);
        } else return null;
    }


    fpDraw(threeDCtx) {

        //console.log(transformedArrow);

        if (this.y <= CANVAS_HEIGHT / 2) {
            if (PARAMS.DEBUG) this.testWall.fpDraw(threeDCtx);
            if (this.direction <= Math.PI / 8 || this.direction >= 15 * Math.PI / 8) {
                this.animations[0][4].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT/2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59/10)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            } else if (this.direction <= 3 * Math.PI / 8) {
                this.animations[0][3].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59/39)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            } else if (this.direction <= 5 * Math.PI / 8) {
                this.animations[0][2].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / (((CANVAS_HEIGHT / 2 - this.y)) * 59));
            } else if (this.direction <= 7 * Math.PI / 8) {
                this.animations[0][1].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59/39)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            } else if (this.direction <= 9 * Math.PI / 8) {
                this.animations[0][0].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59/9)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            } else if (this.direction <= 11 * Math.PI / 8) {
                this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59/39)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            } else if (this.direction <= 13 * Math.PI / 8) {
                this.animations[0][6].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y))- (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            } else if (this.direction <= 15 * Math.PI / 8) {
                this.animations[0][5].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59/39)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + 250 / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
            }

            //threeDCtx.fillRect(320 * -(CANVAS_WIDTH / 2 - transformedArrow.x) / (400 - transformedArrow.y + 1) + CANVAS_WIDTH / 2 - 5, 400 - 5, 10, 10);

            //viewEntities.push(new transEntities[i].constructor(this, p.x, p.y));
            //this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), 400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y)*(this.game.EXP_SCALE/59)*2);
        }
        //}
    }
}