class Imp {
    constructor(game, x, y, direction, animations) {
        Object.assign(this, { game, x, y, direction });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/imp.png");
        //console.log(this.spritesheet);
        this.p1 = new Point(this.x - 33/(((CANVAS_HEIGHT / 2 - this.y) + 2)), this.y);
        this.p2 = new Point(this.x + 33/(((CANVAS_HEIGHT / 2 - this.y) + 2)), this.y);
        this.testWall = new Wall(this.game, this.p1, this.p2, 'Black');

        this.action = 0; //0 = walk, 1 = fire, 2 = die
        this.animations = [];
        this.radius = 0.5;
        this.SCALE = 1000;


        for (var i = 0; i < 3; i++) {
            this.animations.push([]);
        }

        if (!animations) {
            this.animations[0].push(new Animator(this.spritesheet, 3, 3, 42, 59, 4, 0.2, 3, false, true));
            this.animations[0].push(new Animator(this.spritesheet, 4, 66, 46, 59, 4, 0.2, 3, false, true));
            this.animations[0].push(new Animator(this.spritesheet, 3, 127, 39, 53, 4, 0.2, 2, false, true));
            this.animations[0].push(new Animator(this.spritesheet, 3, 183, 34, 51, 4, 0.2, 3, false, true));
            this.animations[0].push(new Animator(this.spritesheet, 4, 237, 35, 50, 4, 0.2, 3, false, true));
            this.animations[0].push(new Animator(this.spritesheet, 535, 183, 34, 51, 4, 0.2, 3, true, true));
            this.animations[0].push(new Animator(this.spritesheet, 517, 127, 39, 53, 4, 0.2, 2, true, true));
            this.animations[0].push(new Animator(this.spritesheet, 486, 66, 46, 59, 4, 0.2, 3, true, true));
        } else {
            this.animations = animations;
        }
    }

    update() {

    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }

    collide(other) {
        return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    }

    getTransform(intCtx, matrix) {
        var transformedImp = transformEntity(this.game, this, matrix);

        //console.log(transformedImp);

        if (transformedImp.y <= CANVAS_HEIGHT / 2) {
            //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);
            //console.log(p);
            intCtx.fillRect(PRE_SCALE * -(CANVAS_WIDTH / 2 - transformedImp.x) / ((400 - transformedImp.y) + 2) + CANVAS_WIDTH / 2 - 2, transformedImp.y - 2, 4, 4);

            var playerImpVector = new Vector(this.game.player.x - this.x, this.game.player.y - this.y);
            playerImpVector.normalize();
            var dirAngle = getAngle(playerImpVector);
            var adjustedDirAngle = (dirAngle - this.direction);
            if (adjustedDirAngle < 0) {
                adjustedDirAngle = 2 * Math.PI + adjustedDirAngle;
            }

            return new Imp(this.game, PRE_SCALE * -(CANVAS_WIDTH / 2 - transformedImp.x) / ((400 - transformedImp.y) + 2) + CANVAS_WIDTH / 2, transformedImp.y,
                adjustedDirAngle, this.animations);
        } else return null;
    }


    fpDraw(threeDCtx) {

        //console.log(transformedImp);

        if (this.y <= CANVAS_HEIGHT / 2) {
            if (PARAMS.DEBUG) this.testWall.fpDraw(threeDCtx);
            //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);
            //console.log(p);
            //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);


            //console.log(adjustedDirAngle);
            if (this.direction <= Math.PI / 8 || this.direction >= 15 * Math.PI / 8) {
                this.animations[0][4].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 100 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 35));
            } else if (this.direction <= 3 * Math.PI / 8) {
                this.animations[0][3].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 34));
            } else if (this.direction <= 5 * Math.PI / 8) {
                this.animations[0][2].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 140 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 39));
            } else if (this.direction <= 7 * Math.PI / 8) {
                this.animations[0][1].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 243 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 46));
            } else if (this.direction <= 9 * Math.PI / 8) {
                this.animations[0][0].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 95 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 42));
            } else if (this.direction <= 11 * Math.PI / 8) {
                this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 243 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 46));
            } else if (this.direction <= 13 * Math.PI / 8) {
                this.animations[0][6].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 140 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / (((CANVAS_HEIGHT / 2 - this.y) + 2) * 39));
            } else if (this.direction <= 15 * Math.PI / 8) {
                this.animations[0][5].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2))) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 34));
            }

            //threeDCtx.fillRect(320 * -(CANVAS_WIDTH / 2 - transformedImp.x) / (400 - transformedImp.y + 1) + CANVAS_WIDTH / 2 - 5, 400 - 5, 10, 10);

            //viewEntities.push(new transEntities[i].constructor(this, p.x, p.y));
            //this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), 400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y)*(this.game.EXP_SCALE/59)*2);
        }
        //}
    }
}