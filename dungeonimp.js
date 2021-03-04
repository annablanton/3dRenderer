class DungeonImp {
    constructor(game, x, y, direction) {
        Object.assign(this, { game, direction });
        this.x = 1 + x * 2;
        this.y = 1 + y * 2;
        this.xArr = x;
        this.yArr = y;
        this.MOONWALK = false;
        this.ATTACK_TIME = 0.6;
        this.attackTimer = 0;
        this.occupied = this.game.dungeon[this.yArr][this.xArr];
        this.occupied.enter();
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/imp.png");
        this.SPEED = 5;
        this.animations = [];
        this.radius = 0.5;
        this.lineCollision = true;
        this.action = 0;
        for (var i = 0; i < 3; i++) {
            this.animations.push([]);
        }
        this.animations[0].push(new Animator(this.spritesheet, 3, 3, 42, 59, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 4, 66, 46, 59, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 3, 127, 39, 53, 4, 0.2, 2, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 3, 183, 34, 51, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 4, 237, 35, 50, 4, 0.2, 3, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 551, 183, 34, 51, 4, 0.2, 3, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 547, 127, 39, 53, 4, 0.2, 2, true, true));
        this.animations[0].push(new Animator(this.spritesheet, 553, 66, 46, 59, 4, 0.2, 3, true, true));
        this.animations[1].push(new Animator(this.spritesheet, 182, 3, 49, 60, 3, 0.2, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 208, 66, 55, 60, 3, 0.2, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 166, 127, 59, 53, 3, 0.2, 1, false, true)); 
        this.animations[1].push(new Animator(this.spritesheet, 152, 183, 46, 51, 3, 0.2, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 154, 237, 38, 50, 3, 0.2, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 404, 183, 46, 51, 3, 0.2, 1, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 367, 127, 59, 53, 3, 0.2, 1, true, true));
        this.animations[1].push(new Animator(this.spritesheet, 381, 65, 55, 59, 3, 0.2, 1, true, true));
        this.p1 = new Point(this.x + this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y + this.radius * Math.sin(this.game.player.direction + Math.PI / 2));
        this.p2 = new Point(this.x - this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y - this.radius * Math.sin(this.game.player.direction + Math.PI / 2));
        this.aggressive = false;
        this.target = new Point(this.game.player.xArr, this.game.player.yArr);
        this.nextOccupied = null;
        this.health = 6;
        this.MAX_HEALTH = 6;
        //this.path = this.aStar(this.target);
        //this.initialPath = [];
        //for (var i = 0; i < this.path.length; i++) {
        //    this.initialPath.push(this.path[i])
        //}
        //if (this.path) {
        //    var nextNodeAndDir = this.path[0];
        //    this.path.splice(0, 1);
        //    var loc = nextNodeAndDir.loc;
        //    var dir = nextNodeAndDir.dir;
        //    var node = nextNodeAndDir.node;
        //    //this.nextLoc = loc;
        //    if (!this.occupied.bottom && dir == 'south') {
        //        this.destination = new Point(this.x, this.y + 2);
        //        node.enter();
        //    } else if (!this.occupied.top && dir == 'north') {
        //        this.destination = new Point(this.x, this.y - 2);
        //        node.enter();
        //    } else if (!this.occupied.left && dir == 'west') {
        //        this.destination = new Point(this.x - 2, this.y + 2);
        //        node.enter();
        //    } else if (!this.occupied.right) {
        //        this.destination = new Point(this.x + 2, this.y + 2);
        //        node.enter();
        //    } else {
        //        this.destination = new Point(1 + this.xArr * 2, 1 + this.yArr * 2);
        //    }
        //} else this.nextDir = null;
        this.path = null;
        this.initialPath = [];
        this.destination = new Point(this.x, this.y);
        this.moving = false;
    }

    update() {
        if (this.health <= 0) this.removeFromWorld = true;
        else {
            //console.log(this.destination);
            if (this.destination.x < this.x) {
                this.updateX(this.x - this.SPEED * this.game.clockTick);
                if (this.MOONWALK) this.direction = 0;
                else this.direction = Math.PI;
                if (this.destination.x >= this.x) {
                    this.updateX(this.destination.x);
                    this.occupied.leave();
                    this.xArr--;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            } else if (this.destination.x > this.x) {
                this.updateX(this.x + this.SPEED * this.game.clockTick);
                if (this.MOONWALK) this.direction = Math.PI;
                else this.direction = 0;
                if (this.destination.x <= this.x) {
                    this.updateX(this.destination.x);
                    this.occupied.leave();
                    this.xArr++;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            } else if (this.destination.y < this.y) {
                this.updateY(this.y - this.SPEED * this.game.clockTick);
                if (this.MOONWALK) this.direction = Math.PI / 2;
                else this.direction = 3 * Math.PI / 2;
                if (this.destination.y >= this.y) {
                    this.updateY(this.destination.y);
                    this.occupied.leave();
                    this.yArr--;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            } else if (this.destination.y > this.y) {
                this.updateY(this.y + this.SPEED * this.game.clockTick);
                if (this.MOONWALK) this.direction = 3 * Math.PI / 2;
                else this.direction = Math.PI / 2;
                if (this.destination.y <= this.y) {
                    this.updateY(this.destination.y);
                    this.occupied.leave();
                    this.yArr++;
                    this.occupied = this.game.dungeon[this.yArr][this.xArr];
                    //this.occupied.enter();
                    this.moving = false;
                }
            }

            if (!this.aggressive) {
                if (distance(this.x, this.y, this.game.player.x, this.game.player.y) < 40) this.aggressive = true;
                else if (this.health < this.MAX_HEALTH) this.aggressive = true;

            }
            if (this.aggressive) {
                //if ((this.manhattanDistance(this.target, new Point(this.game.player.xArr, this.game.player.yArr)) > 4
                //    || this.manhattanDistance(this.target, new Point(this.game.player.xArr, this.game.player.yArr)) >= this.manhattanDistance(new Point(this.xArr, this.yArr), new Point(this.game.player.xArr, this.game.player.yArr))
                //    || this.path == null) && !this.moving) {
                //    this.target = new Point(this.game.player.xArr, this.game.player.yArr);
                //    this.path = this.aStar(this.target);
                //    this.initialPath = [];
                //    for (var i = 0; i < this.path.length; i++) {
                //        this.initialPath.push(this.path[i])
                //    }

                //}
                if (this.path && this.path.length && !this.moving) {
                    var nextNodeAndDir = this.path[0];
                    this.path.splice(0, 1);
                    var dir = nextNodeAndDir.dir;
                    var node = nextNodeAndDir.node;
                    var loc = nextNodeAndDir.loc;
                    this.nextDir = dir;
                } else if (!this.path || !this.path.length) {
                    this.path = this.aStar(this.target);
                    this.initialPath = [];
                    if (this.path) {
                        for (var i = 0; i < this.path.length; i++) {
                            this.initialPath.push(this.path[i])
                        }
                    }
                }

                if (!this.moving && ((this.xArr == this.game.player.xArr - 1 || this.xArr == this.game.player.xArr + 1) && this.yArr == this.game.player.yArr)
                    || (this.xArr == this.game.player.xArr && (this.yArr == this.game.player.yArr - 1 || this.yArr == this.game.player.yArr + 1))) {
                    this.action = 1;
                    if (this.xArr == this.game.player.xArr - 1) this.direction = 0;
                    else if (this.yArr == this.game.player.yArr - 1) this.direction = Math.PI / 2;
                    else if (this.xArr == this.game.player.xArr + 1) this.direction = Math.PI;
                    else this.direction = 3 * Math.PI / 2;
                    //console.log(this.direction);
                } else if (!this.moving && (this.manhattanDistance(this.target, new Point(this.game.player.xArr, this.game.player.yArr)) > 4
                    || this.manhattanDistance(this.target, new Point(this.game.player.xArr, this.game.player.yArr)) >= this.manhattanDistance(new Point(this.xArr, this.yArr), new Point(this.game.player.xArr, this.game.player.yArr))
                    || ((this.xArr == this.target.x - 1 || this.xArr == this.target.x + 1) && this.yArr == this.target.y)
                    || (this.xArr == this.target.x && (this.yArr == this.target.y + 1 || this.yArr == this.target.y - 1))
                    || this.path == null)) {
                    this.target = new Point(this.game.player.xArr, this.game.player.yArr);
                    this.path = this.aStar(this.target);
                    this.initialPath = [];
                    if (this.path) {
                        for (var i = 0; i < this.path.length; i++) {
                            this.initialPath.push(this.path[i])
                        }
                    }

                }
                else if (this.nextDir != null && !this.moving) {
                    this.action = 0;
                    if (this.nextDir == 'north' && !this.occupied.top && !(this.game.dungeon[this.yArr - 1][this.xArr].occupied)) {
                        this.destination = new Point(this.x, this.y - 2);
                        this.game.dungeon[this.yArr - 1][this.xArr].enter();
                        this.nextOccupied = this.game.dungeon[this.yArr - 1][this.xArr];
                        this.moving = true;

                    } else if (this.nextDir == 'east' && !this.occupied.right && !(this.game.dungeon[this.yArr][this.xArr + 1].occupied)) {
                        this.destination = new Point(this.x + 2, this.y);
                        this.game.dungeon[this.yArr][this.xArr + 1].enter();
                        this.nextOccupied = this.game.dungeon[this.yArr][this.xArr + 1];
                        this.moving = true;
                    } else if (this.nextDir == 'south' && !this.occupied.bottom && !(this.game.dungeon[this.yArr + 1][this.xArr].occupied)) {
                        this.destination = new Point(this.x, this.y + 2);
                        this.game.dungeon[this.yArr + 1][this.xArr].enter();
                        this.nextOccupied = this.game.dungeon[this.yArr + 1][this.xArr];
                        this.moving = true;
                    } else if (!this.occupied.left && !(this.game.dungeon[this.yArr][this.xArr - 1].occupied)) {
                        this.destination = new Point(this.x - 2, this.y);
                        this.game.dungeon[this.yArr][this.xArr - 1].enter();
                        this.nextOccupied = this.game.dungeon[this.yArr][this.xArr - 1];
                        this.moving = true;
                    } else {
                        this.path = this.aStar(this.target);
                        this.initialPath = [];
                        if (this.path) {
                            for (var i = 0; i < this.path.length; i++) {
                                this.initialPath.push(this.path[i])
                            }
                        }
                    }
                } else this.action = 0;

                if (this.action == 1) {
                    this.attackTimer += this.game.clockTick;
                    if (this.attackTimer >= this.ATTACK_TIME) {
                        this.attackTimer -= this.ATTACK_TIME;
                        if (this.target.x == this.game.player.xArr && this.target.y == this.game.player.yArr && !PARAMS.DEBUG) this.game.player.health -= 6;
                    }
                }
            }
        }


    }

    cleanMap() {
        this.occupied.leave();
        if (this.nextOccupied) this.nextOccupied.leave();
    }

    draw(ctx) {
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
        ctx.fillRect(this.x + 3 * this.radius * Math.cos(this.game.player.direction + Math.PI / 2), this.y + 3 * this.radius * Math.sin(this.game.player.direction + Math.PI / 2), 2, 2);
    }

    collide(other) {
        return distance(this.x, this.y, other.x, other.y) < this.radius + other.radius;
    }

    computePath(cameFrom, curr) {
        var path = [];
        var keys = Object.keys(cameFrom);
        while (keys.includes([curr.loc.x, curr.loc.y].toString())) {
            curr = cameFrom[[curr.loc.x, curr.loc.y]];
            path.splice(0, 0, curr);
            keys.splice(keys.indexOf([curr.loc.x, curr.loc.y]), 1);
        }
        console.log(path);
        return path;
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

    aStar(target) {
        var xArr = this.xArr;
        var yArr = this.yArr;
        var openSetCoords = new MinHeap(this.game.validSpawns.length);
        var openSetNodes = [];
        openSetNodes[[xArr, yArr]] = this.occupied;
        var cameFrom = [];

        var gScore = [];
        gScore[[xArr, yArr]] = 0;

        var fScore = [];
        fScore[[xArr, yArr]] = this.manhattanDistance(new Point(xArr, yArr), target);
        openSetCoords.insert({ element: fScore[[xArr, yArr]], coords: { x: xArr, y: yArr } });
        var closedSetCoords = [];
        var possibleAttackSquares = [[target.x - 1, target.y], [target.x + 1, target.y], [target.x, target.y - 1], [target.x, target.y + 1]]

        //custom includes mimic found here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        function arrayContains(arr, val) {
            return arr.some(function (arrVal) {
                return val[0] == arrVal[0] && val[1] == arrVal[1];
            })
        }

        while (openSetCoords.size) {
            //var min = Infinity;
            //var currNode = null;
            //var index = -1;

            //openSet.forEach(function (nodeAndLoc) {
            //    var node = nodeAndLoc.node;
            //    var loc = nodeAndLoc.loc;
            //    if (fScore[node] < min) {
            //        min = fScore[node];
            //        currNode = node;
            //        xArr = loc.x;
            //        yArr = loc.y;
            //        index = 
            //    }
            //});

            //for (var i = 0; i < openSetCoords.length; i++) {
            //    var tempX = openSetCoords[i][0];
            //    var tempY = openSetCoords[i][1];
            //    var node = openSetNodes[[tempX, tempY]];
            //    if (fScore[[tempX, tempY]] < min) {
            //        min = fScore[[tempX, tempY]];
            //        currNode = node;
            //        xArr = tempX;
            //        yArr = tempY;
            //        index = i;
            //    }
            //}

            var bestNode = openSetCoords.removeMin();
            xArr = bestNode.coords.x;
            yArr = bestNode.coords.y;
            var currNode = this.game.dungeon[yArr][xArr];



            //console.log([xArr, yArr]);

            //openSetCoords.splice(index, 1);
            //openSetNodes.splice([xArr, yArr], 1);
            //closedSetCoords.push([xArr, yArr]);

            if (arrayContains(possibleAttackSquares, [xArr, yArr])) return this.computePath(cameFrom, { node: currNode, dir: null, loc: { x: xArr, y: yArr } });
            else if (!possibleAttackSquares.length) return null;

            var neighbors = [];
            if (xArr + 1 < this.game.dungeon[yArr].length && !(currNode.right) && !this.game.dungeon[yArr][xArr + 1].occupied) {
                neighbors.push({ node: this.game.dungeon[yArr][xArr + 1], dir: 'east', loc: { x: xArr + 1, y: yArr } });
            } else if (arrayContains(possibleAttackSquares, [xArr + 1, yArr])) {
                var i = 0;
                while (i < possibleAttackSquares.length && (possibleAttackSquares[i][0] != xArr + 1 || possibleAttackSquares[i][1] != yArr)) i++;
                possibleAttackSquares.splice(i, 1);
            }

            if (xArr - 1 >= 0 && !(currNode.left) && !this.game.dungeon[yArr][xArr - 1].occupied) {
                neighbors.push({ node: this.game.dungeon[yArr][xArr - 1], dir: 'west', loc: { x: xArr - 1, y: yArr } });
            } else if (arrayContains(possibleAttackSquares, [xArr - 1, yArr])) {
                var i = 0;
                while (i < possibleAttackSquares.length && (possibleAttackSquares[i][0] != xArr - 1 || possibleAttackSquares[i][1] != yArr)) i++;
                possibleAttackSquares.splice(i, 1);
            }

            if (yArr + 1 < this.game.dungeon.length && !(currNode.bottom) && !this.game.dungeon[yArr + 1][xArr].occupied) {
                neighbors.push({ node: this.game.dungeon[yArr + 1][xArr], dir: 'south', loc: { x: xArr, y: yArr + 1 } });
            } else if (arrayContains(possibleAttackSquares, [xArr, yArr + 1])) {
                var i = 0;
                while (i < possibleAttackSquares.length && (possibleAttackSquares[i][0] != xArr || possibleAttackSquares[i][1] != yArr + 1)) i++;
                possibleAttackSquares.splice(i, 1);
            }

            if (yArr - 1 >= 0 && !(currNode.top) && !this.game.dungeon[yArr - 1][xArr].occupied) {
                //console.log(yArr - 1);
                neighbors.push({ node: this.game.dungeon[yArr - 1][xArr], dir: 'north', loc: { x: xArr, y: yArr - 1 } });
            } else if (arrayContains(possibleAttackSquares, [xArr, yArr - 1])) {
                var i = 0;
                while (i < possibleAttackSquares.length && (possibleAttackSquares[i][0] != xArr || possibleAttackSquares[i][1] != yArr - 1)) i++;
                possibleAttackSquares.splice(i, 1);
            }

            var that = this;
            neighbors.forEach(function (nodeAndDir) {
                var node = nodeAndDir.node;
                var dir = nodeAndDir.dir;
                var loc = nodeAndDir.loc;

                var tentative_gScore = gScore[[xArr, yArr]] + 1;
              
                if ((gScore[[loc.x, loc.y]] === undefined) || tentative_gScore < gScore[[loc.x, loc.y]]) {
                    cameFrom[[loc.x, loc.y]] = { node: currNode, dir: dir, loc: { x: xArr, y: yArr } };
                    gScore[[loc.x, loc.y]] = gScore[[xArr, yArr]] + 1;
                    fScore[[loc.x, loc.y]] = gScore[[loc.x, loc.y]] + that.manhattanDistance(nodeAndDir.loc, target);
                    openSetCoords.insert({ element: fScore[[loc.x, loc.y]], coords: { x: loc.x, y: loc.y } });
                    //openSetNodes[[loc.x, loc.y]] = node;
                }
            });
        }
        return null;
    }

    manhattanDistance(node, target) {
        var dx = Math.abs(node.x - target.x);
        var dy = Math.abs(node.y - target.y);
        //console.log(dx + dy);
        return dx + dy;
    }
}