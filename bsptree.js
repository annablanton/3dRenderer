class BSPTree {
    constructor(entities) {
        if (entities.length == 0) this.root = null;
        else {
            var rootWall = entities[Math.floor(entities.length / 2)];
            if (rootWall instanceof Wall || rootWall instanceof DungeonWall) this.root = new Wall(rootWall.game, rootWall.p1, rootWall.p2, rootWall.color);
            else if (rootWall instanceof Imp || rootWall instanceof DungeonImp) this.root = new Imp(rootWall.game, rootWall.x, rootWall.y, rootWall.direction, rootWall.animations, rootWall.action, rootWall.attackTimer);
            else if (rootWall instanceof Arrow) this.root = new Arrow(rootWall.game, rootWall.x, rootWall.y, rootWall.direction, rootWall.animations);
            var backEntities = [];
            var frontEntities = [];
            var rootVector = new Vector(this.root.p2.x - this.root.p1.x, this.root.p2.y - this.root.p1.y);
            //var rootAngle = Math.atan2(this.root.p2.y - this.root.p1.y, this.root.p2.x - this.root.p1.x);
            for (var i = 0; i < entities.length; i++) {
                if (i != Math.floor(entities.length / 2)) {
                    var wall = entities[i];
                    //console.log(wall);
                    var d1 = (wall.p1.x - this.root.p1.x) * (this.root.p2.y - this.root.p1.y) - (wall.p1.y - this.root.p1.y) * (this.root.p2.x - this.root.p1.x);
                    var d2 = (wall.p2.x - this.root.p1.x) * (this.root.p2.y - this.root.p1.y) - (wall.p2.y - this.root.p1.y) * (this.root.p2.x - this.root.p1.x);
                    var wallVector = new Vector(wall.p2.x - wall.p1.x, wall.p2.y - wall.p1.y);
                    //console.log(wall);
                    var intersect = findIntersect(this.root.p2, wall.p2, rootVector, wallVector);
                    if (d1 < 0 && d2 < 0) {
                        if (wall instanceof DungeonWall || wall instanceof Wall) {
                            frontEntities.push(new Wall(wall.game, wall.p1, wall.p2, wall.color));
                        } else if (wall instanceof DungeonImp || wall instanceof Imp) {
                            frontEntities.push(new Imp(wall.game, wall.x, wall.y, wall.direction, wall.animations, wall.action, wall.attackTimer));
                        } else if (wall instanceof Arrow) {
                            frontEntities.push(new Arrow(wall.game, wall.x, wall.y, wall.direction, wall.animations));
                        }
                    } else if (d1 < 0) {
                        if (wall instanceof DungeonWall || wall instanceof Wall) {
                            var subwall1 = new Wall(wall.game, wall.p1, intersect, wall.color);
                            var subwall2 = new Wall(wall.game, intersect, wall.p2, wall.color);
                            frontEntities.push(subwall1);
                            backEntities.push(subwall2);
                        }
                    } else if (d2 < 0) {
                        if (wall instanceof DungeonWall || wall instanceof Wall) {
                            var subwall1 = new Wall(wall.game, wall.p2, intersect, wall.color);
                            var subwall2 = new Wall(wall.game, intersect, wall.p1, wall.color);
                            frontEntities.push(subwall1);
                            backEntities.push(subwall2);
                        }
                    } else {
                        if (wall instanceof DungeonWall || wall instanceof Wall) {
                            backEntities.push(new Wall(wall.game, wall.p1, wall.p2, wall.color));
                        } else if (wall instanceof DungeonImp || wall instanceof Imp) {
                            backEntities.push(new Imp(wall.game, wall.x, wall.y, wall.direction, wall.animations, wall.action, wall.attackTimer));
                        } else if (wall instanceof Arrow) {
                            backEntities.push(new Arrow(wall.game, wall.x, wall.y, wall.direction));
                        }
                    }

                    //if (p2Angle < 0) {
                    //    p2Angle = 2 * Math.PI - p2Angle;
                    //}

                    //if (rootAngle < 0) {
                    //    rootAngle = 2 * Math.PI - rootAngle;
                    //}

                    //var adjustedAngle = p1Angle - rootAngle;
                    //if (adjustedAngle < 0) {
                    //    adjustedAngle = 2 * Math.PI - adjustedAngle;
                    //}
                    //if (p1Angle > p2Angle) {
                    //    if (wall instanceof DungeonWall || wall instanceof Wall) {
                    //        var subwall1 = new Wall(wall.game, wall.p1, intersect, wall.color);
                    //        var subwall2 = new Wall(wall.game, wall.p2, intersect, wall.color);
                    //    }
                    //    frontEntities.push(subwall1);
                    //    backEntities.push(subwall2);
                    //} else if (p1Angle < p2Angle) {
                    //    if (wall instanceof DungeonWall || wall instanceof Wall) {
                    //        var subwall1 = new Wall(wall.game, wall.p2, intersect, wall.color);
                    //        var subwall2 = new Wall(wall.game, wall.p1, intersect, wall.color);
                    //    }
                    //    frontEntities.push(subwall1);
                    //    backEntities.push(subwall2);
                    //} else if (adjustedAngle > Math.PI) {
                    //    frontEntities.push(new Wall(wall.game, wall.p1, wall.p2, wall.color));
                    //} else {
                    //    backEntities.push(new Wall(wall.game, wall.p1, wall.p2, wall.color));
                    //}
                }
            }


            this.back = new BSPTree(backEntities);
            this.front = new BSPTree(frontEntities);
        }
    }

    bspSort(player, matrix) {
        if (this.root != null) {
            var d = (player.x - this.root.p1.x) * (this.root.p2.y - this.root.p1.y) - (player.y - this.root.p1.y) * (this.root.p2.x - this.root.p1.x);
            if (d < 0) {
                var renderFirst = this.back.bspSort(player, matrix);
                var renderLast = this.front.bspSort(player, matrix);
            } else {
                var renderFirst = this.front.bspSort(player, matrix);
                var renderLast = this.back.bspSort(player, matrix);
            }
            var ret = [];
            for (var i = 0; i < renderFirst.length; i++) {
                let next = renderFirst[i];
                ret.push(next);
            }
            let next = this.root.getRotation(matrix);
            //console.log(next);
            ret.push(next);
            for (var i = 0; i < renderLast.length; i++) {
                let next = renderLast[i];
                ret.push(next);
            }

            return ret;
        } else return [];


    }
}