class Imp {
    constructor(game, x, y, direction, animations, action, attackTimer) {
        Object.assign(this, { game, x, y, direction, action, attackTimer });
        //console.log(this.animations);
        //console.log(this.attackTimer);
        this.radius = 0.5;
        this.p1 = new Point(this.x - this.radius, this.y);
        this.p2 = new Point(this.x + this.radius, this.y);
        var wallVector = new Point(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.testWall = new Wall(this.game, this.p1, this.p2, 'Black', { x: wallVector.x / STEP_COUNT, y: wallVector.y / STEP_COUNT });
        this.SCALE = 1300;
        this.Y_OFFSET = (2000 - this.SCALE)/2;
        this.animations = animations;

    }

    //update() {

    //}

    //draw(ctx) {
    //    ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    //}

    //collide(other) {
    //    return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    //}

    //getTransform(intCtx, matrix) {
    //    var transformedImp = transformEntity(this.game, this, matrix, Imp);

    //    //console.log(transformedImp);

    //    if (transformedImp.y <= CANVAS_HEIGHT / 2) {
    //        //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);
    //        //console.log(p);
    //        intCtx.fillRect(PRE_SCALE * -(CANVAS_WIDTH / 2 - transformedImp.x) / ((400 - transformedImp.y) + 2) + CANVAS_WIDTH / 2 - 2, transformedImp.y - 2, 4, 4);

    //        var playerImpVector = new Vector(this.game.player.x - this.x, this.game.player.y - this.y);
    //        playerImpVector.normalize();
    //        var dirAngle = getAngle(playerImpVector);
    //        var adjustedDirAngle = (dirAngle - this.direction);
    //        if (adjustedDirAngle < 0) {
    //            adjustedDirAngle = 2 * Math.PI + adjustedDirAngle;
    //        }

    //        return new Imp(this.game, PRE_SCALE * -(CANVAS_WIDTH / 2 - transformedImp.x) / ((400 - transformedImp.y) + 2) + CANVAS_WIDTH / 2, transformedImp.y,
    //            adjustedDirAngle, this.animations);
    //    } else return null;
    //}
    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }
    getRotation(matrix) {
        return transformEntity(this.game, this, matrix, Imp, this.animations, this.action, this.attackTimer);
    }


    getTransform(intCtx) {
        //console.log(transformedImp);

        if (this.y <= CANVAS_HEIGHT / 2) {
            //intCtx.fillRect(this.x - 2, this.y - 2, 4, 4);
            //console.log(p);
            intCtx.fillRect(PRE_SCALE * -(CANVAS_WIDTH / 2 - this.x) / ((400 - this.y) + 2) + CANVAS_WIDTH / 2 - 2, this.y - 2, 4, 4);

            var playerImpVector = new Vector(this.game.player.x - this.x, this.game.player.y - this.y);
            playerImpVector.normalize();
            var dirAngle = getAngle(playerImpVector);
            var adjustedDirAngle = (dirAngle - this.direction);
            if (adjustedDirAngle < 0) {
                adjustedDirAngle = 2 * Math.PI + adjustedDirAngle;
            }

            //return new Imp(this.game, PRE_SCALE * -(CANVAS_WIDTH / 2 - this.x) / ((400 - this.y) + 2) + CANVAS_WIDTH / 2, this.y,
            //    this.direction, this.animations, this.action, this.attackTimer);
            return new Imp(this.game, this.x, this.y,
                this.direction, this.animations, this.action, this.attackTimer);
        } else return null;
    }


    fpDraw(threeDCtx) {
        //console.log(this.direction);

        //console.log(transformedImp);

        if (this.y <= CANVAS_HEIGHT / 2) {
            if (PARAMS.DEBUG) this.testWall.fpDraw(threeDCtx);
            //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);
            //console.log(p);
            //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);


            //console.log(adjustedDirAngle);
            if (this.action == 0) {
                if (this.direction <= Math.PI / 8 || this.direction >= 15 * Math.PI / 8) {
                    this.animations[this.action][0].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT/2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) *(42/59) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
                } else if (this.direction <= 3 * Math.PI / 8) {
                    this.animations[this.action][7].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (46/59) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
                } else if (this.direction <= 5 * Math.PI / 8) {
                    this.animations[this.action][6].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (39/53) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / (((CANVAS_HEIGHT / 2 - this.y)) * 53));
                } else if (this.direction <= 7 * Math.PI / 8) {
                    this.animations[this.action][5].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (34/51) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 51));
                } else if (this.direction <= 9 * Math.PI / 8) {
                    this.animations[this.action][4].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (35/50) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 50));
                } else if (this.direction <= 11 * Math.PI / 8) {
                    this.animations[this.action][3].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (34/41) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 51));
                } else if (this.direction <= 13 * Math.PI / 8) {
                    this.animations[this.action][2].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (39 / 53) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 53));
                } else if (this.direction <= 15 * Math.PI / 8) {
                    this.animations[this.action][1].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * (46 / 59) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59));
                }
            } else if (this.action == 1) {
                if (this.direction <= Math.PI / 8 || this.direction >= 15 * Math.PI / 8) {
                    this.animations[this.action][0].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 60), this.attackTimer);
                } else if (this.direction <= 3 * Math.PI / 8) {
                    this.animations[this.action][7].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 59), this.attackTimer);
                } else if (this.direction <= 5 * Math.PI / 8) {
                    this.animations[this.action][6].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * 0.75 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / (((CANVAS_HEIGHT / 2 - this.y)) * 53), this.attackTimer);
                } else if (this.direction <= 7 * Math.PI / 8) {
                    this.animations[this.action][5].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 51) * 1.5, this.attackTimer);
                } else if (this.direction <= 9 * Math.PI / 8) {
                    this.animations[this.action][4].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) / 2 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 50), this.attackTimer);
                } else if (this.direction <= 11 * Math.PI / 8) {
                    this.animations[this.action][3].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) * 0.8 + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 51), this.attackTimer);
                } else if (this.direction <= 13 * Math.PI / 8) {
                    this.animations[this.action][2].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 53), this.attackTimer);
                } else if (this.direction <= 15 * Math.PI / 8) {
                    this.animations[this.action][1].drawFrame(this.game.clockTick, threeDCtx, POST_SCALE * (this.x - CANVAS_WIDTH / 2) / ((CANVAS_HEIGHT / 2 - this.y)) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y))) + CANVAS_WIDTH / 2,
                        -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y) + this.Y_OFFSET / (CANVAS_HEIGHT / 2 - this.y) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y) * 60), this.attackTimer);
                }
            }

            //threeDCtx.fillRect(320 * -(CANVAS_WIDTH / 2 - transformedImp.x) / (400 - transformedImp.y + 1) + CANVAS_WIDTH / 2 - 5, 400 - 5, 10, 10);

            //viewEntities.push(new transEntities[i].constructor(this, p.x, p.y));
            //this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), 400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y)*(this.game.EXP_SCALE/59)*2);
        }
        //}
    }
}