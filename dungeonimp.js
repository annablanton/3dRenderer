class DungeonImp {
    constructor(game, x, y, direction) {
        Object.assign(this, { game, direction });
        this.x = 2 + x * 4;
        this.y = 2 + y * 4;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/imp.png");
        this.animations = [];
        this.radius = 1;
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
        this.p1 = new Point(this.x + this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y + this.radius * Math.sin(this.game.player.direction + Math.PI / 2));
        this.p2 = new Point(this.x - this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y - this.radius * Math.sin(this.game.player.direction + Math.PI / 2));
    }

    update() {

    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
    }

    collide(other) {
        return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    }

    //getRotation(matrix) {
    //    return transformEntity(this.game, this, matrix, Imp, this.animations);

        //console.log(transformedImp);

        //if (transformedImp.y <= CANVAS_HEIGHT / 2) {
        //    //intCtx.fillRect(transformedImp.x - 2, transformedImp.y - 2, 4, 4);
        //    //console.log(p);
        //    intCtx.fillRect(PRE_SCALE * -(CANVAS_WIDTH / 2 - transformedImp.x) / ((400 - transformedImp.y) + 2) + CANVAS_WIDTH / 2 - 2, transformedImp.y - 2, 4, 4);

        //    var playerImpVector = new Vector(this.game.player.x - this.x, this.game.player.y - this.y);
        //    playerImpVector.normalize();
        //    var dirAngle = getAngle(playerImpVector);
        //    var adjustedDirAngle = (dirAngle - this.direction);
        //    if (adjustedDirAngle < 0) {
        //        adjustedDirAngle = 2 * Math.PI + adjustedDirAngle;
        //    }

        //    return new Imp(this.game, PRE_SCALE * -(CANVAS_WIDTH / 2 - transformedImp.x) / ((400 - transformedImp.y) + 2) + CANVAS_WIDTH / 2, transformedImp.y,
        //        adjustedDirAngle, this.animations);
        //} else return null;
    //}

    //getTransform(intCtx) {
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
}