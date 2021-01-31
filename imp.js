class Imp {
    constructor(game, x, y, direction) {
        Object.assign(this, { game, x, y, direction });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/imp.png");
        //console.log(this.spritesheet);
        this.p1 = new Point(this.x - (30 * Math.cos(this.direction)), this.y - (30 * Math.sin(this.direction)));
        this.p2 = new Point(this.x + (30 * Math.cos(this.direction)), this.y + (30 * Math.sin(this.direction)));
        this.testWall = new Wall(this.game, this.p1, this.p2, 'Black');

        this.action = 0; //0 = walk, 1 = fire, 2 = die
        this.animations = [];

        for (var i = 0; i < 3; i++) {
            this.animations.push([]);
        }
        this.animations[0].push(new Animator(this.spritesheet, 3, 3, 42, 59, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 4, 66, 46, 59, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 3, 127, 39, 53, 4, 0.2, 2, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 3, 183, 34, 51, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 4, 237, 35, 50, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 535, 183, 34, 51, 4, 0.2, 3, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 517, 127, 39, 53, 4, 0.2, 2, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 486, 66, 46, 59, 4, 0.2, 3, true, true));
    }

    update() {

    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }

    fpDraw(intCtx, threeDCtx) {
        var transformedImp = transformEntity(this.game, this, intCtx);

        //console.log(transformedImp);

        if (transformedImp.y <= CANVAS_HEIGHT / 2) {
            this.testWall.fpDraw(intCtx, threeDCtx);
            //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);
            var p = new Point(((transformedImp.x - CANVAS_WIDTH / 2) / -(transformedImp.y - CANVAS_HEIGHT / 2 - this.game.X_CLAMP)) * this.game.SCALE + CANVAS_WIDTH / 2, transformedImp.y);
            //console.log(p);
            intCtx.fillRect(p.x - 2, p.y - 2, 4, 4);

            var playerImpVector = new Vector(this.game.player.x - this.x, this.game.player.y - this.y);
            playerImpVector.normalize();
            var dirAngle = getAngle(playerImpVector);
            var adjustedDirAngle = (dirAngle - this.direction);
            if (adjustedDirAngle < 0) {
                adjustedDirAngle = 2 * Math.PI + adjustedDirAngle;
            }

            console.log(adjustedDirAngle);
            if (adjustedDirAngle <= Math.PI / 8 || adjustedDirAngle >= 15 * Math.PI / 8) {
                this.animations[0][0].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 3 * Math.PI / 8) {
                this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 5 * Math.PI / 8) {
                this.animations[0][6].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 7 * Math.PI / 8) {
                this.animations[0][5].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 9 * Math.PI / 8) {
                this.animations[0][4].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 11 * Math.PI / 8) {
                this.animations[0][3].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 13 * Math.PI / 8) {
                this.animations[0][2].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            } else if (adjustedDirAngle <= 15 * Math.PI / 8) {
                this.animations[0][1].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2),
                    400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2);
            }

            //viewEntities.push(new transEntities[i].constructor(this, p.x, p.y));
            //this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), 400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y)*(this.game.EXP_SCALE/59)*2);
        }
        //}
    }
}