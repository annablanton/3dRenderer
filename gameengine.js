// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(size) {
        this.entities = [];
        this.showOutlines = false;
        this.mapCtx = null;
        this.intCtx = null;
        this.click = false;
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
        this.space = false;
        this.xDelta = 0;
        this.enemies = 0;
        this.spawnTimer = 0;
        this.wave = 0;

        this.validSpawns = [];

        //this.map = mapGraph;
        this.player = null;

        this.SCALE = 22;
        this.EXP_SCALE = 22;
        this.EXP_EQ = 2 ** (1 / 200) * 5 ** (1 / 400);
        this.X_CLAMP = 50;

        this.lastE = 0;

        this.entities = [];
        this.walls = [];
        this.dungeon = [];
        for (var i = 0; i < size; i++) {
            this.dungeon.push([]);
        }

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                this.dungeon[i][j] = new Tile();
            }
        }
    };

    init(mapCtx, intCtx, threeDCtx, size) {
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
                case "Space":
                    e.preventDefault();
                    that.space = true;
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
                case "Space":
                    that.space = false;
            }
        });
        var onMouseDown = (e) => {
            switch (e.button) {
                case 0:
                    that.click = true;
                    break;
            }
        }
        this.threeDCtx.canvas.addEventListener("mousedown", onMouseDown, false);
        var onMouseDown = (e) => {
            switch (e.which) {
                case 0:
                    that.click = true;
                    break;
            }
        }
        var onMouseUp = (e) => {
            switch (e.button) {
                case 0:
                    console.log(that.click);
                    that.click = false;
                    console.log(that.click);
                    break;
            }
        }

        this.threeDCtx.canvas.addEventListener("mouseup", onMouseUp, false);
        function lockChangeAlert() {
            if (document.pointerLockElement === that.threeDCtx.canvas ||
                document.mozPointerLockElement === that.threeDCtx.canvas) {
                console.log('The pointer lock status is now locked');
                that.threeDCtx.canvas.addEventListener("mousemove", updatePosition, false);
            } else {
                console.log('The pointer lock status is now unlocked');
                that.threeDCtx.canvas.removeEventListener("mousemove", updatePosition, false);
            }
        }
        var that = this;
        function updatePosition(e) {
            if (Math.abs(e.movementX - that.lastE) < 100 && that.player.health > 0) that.player.updateDirection(e.movementX / 400);
            that.lastE = e.movementX;
        }

        document.addEventListener("pointerlockchange", lockChangeAlert, false);

        document.addEventListener("mozpointerlockchange", lockChangeAlert, false);
    };

    addEntity(entity) {
        if (entity instanceof Player) {
            this.player = entity;
        } else this.entities.push(entity);
    };

    depthFirstSearch(v) {
        var curr = this.dungeon[v.y][v.x];
        if (!curr.discovered) this.validSpawns.push(v);
        curr.discovered = true;
        if (v.x - 1 >= 0 && !curr.left && !this.dungeon[v.y][v.x - 1].discovered) this.depthFirstSearch({ x: v.x - 1, y: v.y });
        if (v.x + 1 < this.dungeon[v.y].length && !curr.right && !this.dungeon[v.y][v.x + 1].discovered) this.depthFirstSearch({ x: v.x + 1, y: v.y });
        if (v.y + 1 < this.dungeon.length && !curr.bottom && !this.dungeon[v.y + 1][v.x].discovered) this.depthFirstSearch({ x: v.x, y: v.y + 1 });
        if (v.y - 1 >= 0 && !curr.top && !this.dungeon[v.y - 1][v.x].discovered) this.depthFirstSearch({ x: v.x, y: v.y - 1 });
    }

    draw() {
        this.mapCtx.clearRect(-CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, this.mapCtx.canvas.width, this.mapCtx.canvas.height);
        this.intCtx.clearRect(0, 0, this.intCtx.canvas.width, this.intCtx.canvas.height);
        this.threeDCtx.clearRect(0, 0, this.threeDCtx.canvas.width, this.threeDCtx.canvas.height);

        this.threeDCtx.fillStyle = "Cyan";
        this.threeDCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT/2);
        this.threeDCtx.fillStyle = "darkgrey";
        this.threeDCtx.fillRect(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);
        this.threeDCtx.fillText("Wave: " + this.wave.toString(), 20, 20);
        this.threeDCtx.fillText("Enemies remaining: " + this.enemies.toString(), 20, 50);
        this.mapCtx.save();
        //console.log(this.entities)
        var bsp = new BSPTree(this.entities);
        //console.log(bsp);
        var matrix = frameRotationMatrix(this);
        var transEntities = bsp.bspSort(this.player, matrix);

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.mapCtx);
        }
        //console.log(transEntities);
        for (var i = 0; i < transEntities.length; i++) {
            //transEntities[i].draw(this.mapCtx);
            var nextEntity = transEntities[i].getTransform(this.intCtx);
            //console.log(nextEntity);
            if (nextEntity) {
                nextEntity.fpDraw(this.threeDCtx);
            }
        }

        //for (var i = 0; i < sortedEntities.length; i++) {
        //    var nextEntity = sortedEntities[i];
        //    if (nextEntity) nextEntity = nextEntity.getTransform(this.intCtx);
        //    if (nextEntity != null) {
        //        nextEntity.fpDraw(this.threeDCtx);
        //    }
        //}

        this.hud.fpDraw(this.threeDCtx);

        this.player.draw(this.mapCtx);
    };

    update() {
        if (!this.enemies) {
            this.wave++;
            this.enemies = 3 + this.wave * 2;
            this.spawnTimer = 2;
            var selectedSpawns = [];
            for (var i = 0; i < 4 - Math.ceil(this.player.health / 30); i++) {
                var nextSpawnVal = randomInt(this.validSpawns.length);
                var nextSpawn = this.validSpawns[nextSpawnVal];
                this.validSpawns.splice(nextSpawnVal, 1);
                selectedSpawns.push(nextSpawn);
                this.addEntity(new DungeonChicken(this, nextSpawn.x, nextSpawn.y));
            }
            this.validSpawns = this.validSpawns.concat(selectedSpawns);
        } else if (this.spawnTimer) {
            this.spawnTimer -= this.clockTick;
            if (this.spawnTimer <= 0) {
                this.spawnTimer = 0;
                this.spawning = true;
            }
        } else if (this.spawning) {
            this.spawning = false;
            var selectedSpawns = [];
            for (var i = 0; i < this.enemies; i++) {
                var nextSpawnVal = randomInt(this.validSpawns.length);
                var nextSpawn = this.validSpawns[nextSpawnVal];
                this.validSpawns.splice(nextSpawnVal, 1);
                selectedSpawns.push(nextSpawn);
                this.addEntity(new DungeonImp(this, nextSpawn.x, nextSpawn.y, Math.random() * 2 * Math.PI));
            }

            this.validSpawns = this.validSpawns.concat(selectedSpawns);


        }
        //console.log(this.click);
        PARAMS.DEBUG = document.getElementById("debug").checked;
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            var entity = this.entities[i];
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
                if (entity instanceof DungeonImp) {
                    entity.cleanMap();
                    this.enemies--;
                }
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