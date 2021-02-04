// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.mapCtx = null;
        this.intCtx = null;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.turnLeft = false;
        this.turnRight = false;

        //this.map = mapGraph;
        this.player = null;

        this.SCALE = 22;
        this.EXP_SCALE = 22;
        this.EXP_EQ = 2 ** (1 / 200) * 5 ** (1 / 400);
        this.X_CLAMP = 50;

        this.entities = [];
        this.walls = [];
    };

    init(mapCtx, intCtx, threeDCtx) {
        this.mapCtx = mapCtx;
        this.intCtx = intCtx;
        this.threeDCtx = threeDCtx;
        this.surfaceWidth = this.mapCtx.canvas.width;
        this.surfaceHeight = this.mapCtx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.mapCtx.canvas);
        })();
    };

    startInput() {
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.mapCtx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.mapCtx.canvas.getBoundingClientRect().top;

            return { x: x, y: y };
        }

        this.threeDCtx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
        }, false);

        this.threeDCtx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            that.click = getXandY(e);
        }, false);

        this.threeDCtx.canvas.addEventListener("wheel", function (e) {
            //console.log(getXandY(e));
            that.wheel = e;
            //       console.log(e.wheelDelta);
            e.preventDefault();
        }, false);

        this.threeDCtx.canvas.addEventListener("contextmenu", function (e) {
            //console.log(getXandY(e));
            that.rightclick = getXandY(e);
            e.preventDefault();
        }, false);

        this.threeDCtx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "KeyW":
                    that.up = true;
                    break;
                case "KeyA":
                    that.left = true;
                    break;
                case "KeyS":
                    that.down = true;
                    break;
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowLeft":
                    that.turnLeft = true;
                    //console.log("a");
                    break;
                case "ArrowRight":
                    that.turnRight = true;
                    break;
            }
        });

        this.threeDCtx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "KeyW":
                    that.up = false;
                    break;
                case "KeyA":
                    that.left = false;
                    break;
                case "KeyS":
                    that.down = false;
                    break;
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowLeft":
                    that.turnLeft = false;
                    //console.log("a");
                    break;
                case "ArrowRight":
                    that.turnRight = false;
                    break;
            }
        });
    };

    addEntity(entity) {
        if (entity instanceof Player) {
            this.player = entity;
        } else this.entities.push(entity);
    };

    draw() {
        this.mapCtx.clearRect(-CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, this.mapCtx.canvas.width, this.mapCtx.canvas.height);
        this.intCtx.clearRect(0, 0, this.intCtx.canvas.width, this.intCtx.canvas.height);
        this.threeDCtx.clearRect(0, 0, this.threeDCtx.canvas.width, this.threeDCtx.canvas.height);

        this.threeDCtx.fillStyle = "Cyan";
        this.threeDCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT/2);
        this.threeDCtx.fillStyle = "darkgrey";
        this.threeDCtx.fillRect(0, CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT /2);
        this.mapCtx.save();

        var transEntities = [];

        var matrix = frameRotationMatrix(this);

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.mapCtx);
            var nextEntity = this.entities[i].getTransform(this.intCtx, matrix);
            if (nextEntity !== null) {
                transEntities.push(nextEntity);
            }
        }

        var dg = digraphFromWalls(transEntities);
        var sortedEntities = topologicalSort(dg);

        for (var i = 0; i < sortedEntities.length; i++) {
            var nextEntity = sortedEntities[i];
            if (nextEntity != null) {
                nextEntity.fpDraw(this.threeDCtx);
            }
        }

        this.player.draw(this.mapCtx);
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

        this.player.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };


};