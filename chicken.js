// JavaScript source code
class Chicken {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/chickenonaplate-1.png");
        //console.log(this.spritesheet);
        
        this.radius = 0.5;
        this.p1 = new Point(this.x - PRE_SCALE * this.radius / (((CANVAS_HEIGHT / 2 - this.y) + 2)), this.y);
        this.p2 = new Point(this.x + PRE_SCALE * this.radius / (((CANVAS_HEIGHT / 2 - this.y) + 2)), this.y);
        this.testWall = new Wall(this.game, this.p1, this.p2, 'Black');

        this.action = 0; //0 = walk, 1 = fire, 2 = die
        this.animation = new Animator(this.spritesheet, 0, 48, 192, 120, 1, 0.2, 1, false, true);
        this.SCALE = 1000;
    }

    update() {

    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    getRotation(matrix) {
        return transformEntity(this.game, this, matrix, Chicken);

    }

    getTransform(intCtx) {
        if (this.y <= CANVAS_HEIGHT / 2) {
            //intCtx.fillRect(this.x - 2, this.y - 2, 4, 4);
            //console.log(p);

            return new Chicken(this.game, PRE_SCALE * -(CANVAS_WIDTH / 2 - this.x) / ((400 - this.y) + 2) + CANVAS_WIDTH / 2, this.y);
        } else return null;
    }

    collide(other) {
        return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    }


    fpDraw(threeDCtx) {

        //console.log(transformedChicken);

        if (this.y <= CANVAS_HEIGHT / 2) {
            if (PARAMS.DEBUG) this.testWall.fpDraw(threeDCtx);
            //intCtx.fillRect(transformedChicken.x - 2, transformedChicken.y - 2, 4, 4);
            //console.log(p);
            //intCtx.fillRect(transformedChicken.x - 2, transformedChicken.y - 2, 4, 4);


            //console.log(adjustedDirAngle);
            this.animation.drawFrame(this.game.clockTick, threeDCtx, POST_SCALE / PRE_SCALE * (this.x - CANVAS_WIDTH / 2) - (this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 300/192)) / 2 + CANVAS_WIDTH / 2,
                    -this.SCALE / 2 / (CANVAS_HEIGHT / 2 - this.y + 2) + 1100 / (CANVAS_HEIGHT / 2 - this.y + 2) + CANVAS_HEIGHT / 2, this.SCALE / ((CANVAS_HEIGHT / 2 - this.y + 2) * 300));
            //threeDCtx.fillRect(320 * -(CANVAS_WIDTH / 2 - transformedChicken.x) / (400 - transformedChicken.y + 1) + CANVAS_WIDTH / 2 - 5, 400 - 5, 10, 10);

            //viewEntities.push(new transEntities[i].constructor(this, p.x, p.y));
            //this.animations[0][7].drawFrame(this.game.clockTick, threeDCtx, p.x - (20 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), 400 - (15 * ((this.game.EXP_EQ) ** p.y) * (this.game.EXP_SCALE / 59) * 2), ((this.game.EXP_EQ) ** p.y)*(this.game.EXP_SCALE/59)*2);
        }
        //}
    }
}