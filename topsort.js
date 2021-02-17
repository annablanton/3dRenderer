//Turns out painter's algorithm doesn't really work with the way we're projecting walls, whoops

function topologicalSort(digraph) {
    //topological sort algorithm borrowed from https://courses.cs.washington.edu/courses/cse326/03wi/lectures/RaoLect20.pdf
    var inDegreeArray = [];
    var vertices = digraph.vertices;
    var adjacencyList = digraph.adjacencyList;
    for (var i = 0; i < vertices.length; i++) {
        inDegreeArray.push(0);
    }

    for (var i = 0; i < adjacencyList.length; i++) {
        var curr = adjacencyList[i].head;
        if (curr !== null) {
            inDegreeArray[curr.elem]++;
            while (curr.next !== null) {
                curr = curr.next;
                inDegreeArray[curr.elem]++;
            }
        }
    }

    var sorted = [];

    var vertexStack = [];
    for (var i = 0; i < inDegreeArray.length; i++) {
        if (!inDegreeArray[i]) {
            vertexStack.push({ index: i, entity: vertices[i] });
        }
    }

    while (vertexStack.length > 0) {
        var obj = vertexStack.pop();
        var index = obj.index;
        var entity = obj.entity;
        sorted.push(entity);
        var curr = adjacencyList[index].head;
        if (curr !== null) {
            while (curr !== null) {
                var removedEdgeTarget = curr.elem;
                inDegreeArray[removedEdgeTarget]--;
                if (inDegreeArray[removedEdgeTarget] === 0) {
                    vertexStack.push({ index: removedEdgeTarget, entity: vertices[removedEdgeTarget] });
                }
                curr = curr.next;
            }
        }
    }

    return sorted;

}

function digraphFromWalls(walls) {
    var dg = new Digraph(walls[0]);
    for (var i = 1; i < walls.length; i++) {
        dg.addVertex(walls[i]);
    }

    for (var i = 0; i < walls.length; i++) {
        for (var j = 0; j < walls.length; j++) {
            if (i != j) {
                var wall1 = walls[i];
                var wall2 = walls[j];
                if (wall1 != null && wall2 != null) {
                    var cutWalls = cutToOverlap(wall1, wall2);
                    wall1 = cutWalls.wall1;
                    wall2 = cutWalls.wall2;
                    console.log(wall1);
                    if (wall1 != null && wall2 != null) {
                        var wall1SmallerX = Math.min(wall1.p1.x, wall1.p2.x);
                        var wall1LargerX = Math.max(wall1.p1.x, wall1.p2.x);
                        var wall1LargerY = Math.max(wall1.p1.y, wall1.p2.y);
                        if (wall1.p1.y > wall1.p2.y) {
                            var wall1LargerYCorrespondingX = wall1.p1.x;
                            var wall1SmallerY = wall1.p2.y;
                            var wall1SmallerYCorrespondingX = wall1.p2.x;
                        } else {
                            var wall1LargerYCorrespondingX = wall1.p2.x;
                            var wall1SmallerY = wall1.p1.y;
                            var wall1SmallerYCorrespondingX = wall1.p1.x;
                        }

                        if (wall2.p1.y < wall2.p2.y) {
                            var wall2LargerY = wall2.p2.y;
                            var wall2LargerYCorrespondingX = wall2.p2.x;
                            var wall2SmallerY = wall2.p1.y;
                            var wall2SmallerYCorrespondingX = wall2.p1.x;
                        } else {
                            var wall2LargerY = wall2.p1.y;
                            var wall2LargerYCorrespondingX = wall2.p1.x;
                            var wall2SmallerY = wall2.p2.y;
                            var wall2SmallerYCorrespondingX = wall2.p2.x;
                        }
                        var wall2SmallerX = Math.min(wall2.p1.x, wall2.p2.x);
                        var wall2LargerX = Math.max(wall2.p1.x, wall2.p2.x);

                        if (wall2.p1.x > wall1SmallerX && wall2.p1.x < wall1LargerX) {

                            var wall1Angle = Math.atan2(wall1LargerY - wall1SmallerY, wall1LargerYCorrespondingX - wall1SmallerYCorrespondingX);
                            var wall2Angle = Math.atan2(wall2.p1.y - wall1SmallerY, wall2.p1.x - wall1SmallerYCorrespondingX);
                            if (wall1Angle != Math.PI / 2) {
                                if (wall1Angle < Math.PI / 2) {
                                    if (wall2Angle > wall1Angle && wall2Angle < Math.PI / 2) {
                                        dg.addDirectedEdge(i, j);
                                    }
                                } else {
                                    if (wall2Angle < wall1Angle && wall2Angle >= Math.PI / 2) {
                                        dg.addDirectedEdge(i, j);
                                    }
                                }
                            }
                        } else if (wall2.p2.x > wall1SmallerX && wall2.p2.x < wall1LargerX) {
                            var wall1Angle = Math.atan2(wall1LargerY - wall1SmallerY, wall1LargerYCorrespondingX - wall1SmallerYCorrespondingX);
                            if (wall2.p2.x != wall1SmallerYCorrespondingX) {
                                var wall2Angle = Math.atan2(wall2.p2.y - wall1SmallerY, wall2.p2.x - wall1SmallerYCorrespondingX);
                            } else {
                                var wall2Angle = Math.atan2(wall2.p1.y - wall1SmallerY, wall2.p2.x - wall1SmallerYCorrespondingX);
                            }
                            if (wall1Angle != Math.PI / 2) {
                                if (wall1Angle < Math.PI / 2) {
                                    if (wall2Angle > wall1Angle && wall2Angle < Math.PI / 2) {
                                        dg.addDirectedEdge(i, j);
                                    }
                                } else {
                                    if (wall2Angle < wall1Angle && wall2Angle >= Math.PI / 2) {
                                        dg.addDirectedEdge(i, j);
                                    }
                                }
                            }
                        } else if (wall1.p1.x >= wall2SmallerX && wall1.p2.x <= wall2LargerX && wall1.p2.x >= wall2SmallerX && wall1.p2.x <= wall2LargerX) {
                            if ((wall1.p1.x != wall2SmallerYCorrespondingX || wall1.p1.y != wall2SmallerY) && (wall1.p1.x != wall2LargerYCorrespondingX || wall1.p1.y != wall2LargerY)) {
                                var wall1Angle = Math.atan2(wall1.p1.y - wall2SmallerY, wall1.p1.x - wall2SmallerYCorrespondingX);
                            } else {
                                var wall1Angle = Math.atan2(wall1.p2.y - wall2SmallerY, wall1.p2.x - wall2SmallerYCorrespondingX);
                            }
                            var wall2Angle = Math.atan2(wall2LargerY - wall2SmallerY, wall2LargerYCorrespondingX - wall2SmallerYCorrespondingX);
                            if (wall2Angle != Math.PI / 2) {
                                if (wall2Angle < Math.PI / 2) {
                                    if (wall1Angle > -Math.PI / 2 && wall1Angle < wall2Angle) {
                                        dg.addDirectedEdge(i, j);
                                    }
                                } else {
                                    if (wall1Angle >= wall2Angle || (wall1Angle <= -Math.PI / 2)) {
                                        dg.addDirectedEdge(i, j);
                                    }
                                }
                            }
                        }
                        
                    }
                }
            }
        }
    }

    return dg;
}

function transformPoint(p) {
    return new Point(PRE_SCALE * -(CANVAS_WIDTH / 2 - p.x) / ((CANVAS_HEIGHT / 2 - p.y) + 2) + CANVAS_WIDTH / 2, p.y);
}
function correctFloatingPointError(wall1, wall2) {
    if (wall1 != null && wall2 != null) {
        if (wall1.p1.y - wall2.p1.y >= -3 && wall1.p1.y - wall2.p1.y <= 3 && wall1.p1.x == wall2.p1.x) {
            return { wall1: new Wall(null, wall2.p1, wall1.p2, null), wall2: wall2 };
        } else if (wall1.p1.y - wall2.p2.y >= -3 && wall1.p1.y - wall2.p2.y <= 3 && wall1.p1.x == wall2.p2.x) {
            return { wall1: new Wall(null, wall2.p2, wall1.p2, null), wall2: wall2 };
        } else if (wall1.p2.y - wall2.p1.y >= -3 && wall1.p2.y - wall2.p1.y <= 3 && wall1.p2.x == wall2.p1.x) {
            return { wall1: new Wall(null, wall1.p1, wall2.p1, null), wall2: wall2 };
        } else if (wall1.p2.y - wall2.p2.y >= -3 && wall1.p2.y - wall2.p1.y <= 3 && wall1.p2.x == wall2.p2.x) {
            return { wall1: new Wall(null, wall1.p1, wall2.p2, null), wall2: wall2 };
        } else {
            return { wall1: wall1, wall2: wall2 };
        }
    } else {
        return { wall1: wall1, wall2: wall2 };
    }
}

function cutAtIntersect(wall1, wall2) {
    if (wall1 != null && wall2 != null) {
        if (wall1.p1.x != wall2.p1.x && wall1.p2.x != wall2.p1.x && wall1.p2.x != wall2.p2.x) {
            var wall1Origin = wall1.p1;
            var wall2Origin = wall2.p1;

            var wall1Vector = new Vector(wall1.p2.x - wall1.p1.x, wall1.p2.y - wall1.p1.y);
            var wall2Vector = new Vector(wall2.p2.x - wall2.p1.x, wall2.p2.y - wall2.p1.y);
            if (wall1Vector.x != 0) {
                var constEQ = (wall2Origin.x - wall1Origin.x) / wall1Vector.x;
                var uEQ = wall2Vector.x / wall1Vector.x;
                var u = (wall2Origin.y - wall1Origin.y - wall1Vector.y * constEQ) / (wall1Vector.y * uEQ - wall2Vector.y);
                var t = (wall2Vector.x * u + wall2Origin.x - wall1Origin.x) / wall1Vector.x;

                var xIntersect = wall1Origin.x + wall1Vector.x * t;
                var yIntersect = wall1Origin.y + wall1Vector.y * t;

                var wall1SmallerX = Math.min(wall1.p1.x, wall1.p2.x);
                var wall1LargerX = Math.max(wall1.p1.x, wall1.p2.x);

                var wall2SmallerX = Math.min(wall2.p1.x, wall2.p2.x);
                var wall2LargerX = Math.max(wall2.p1.x, wall2.p2.x);

                if (xIntersect < wall1LargerX && xIntersect > wall1SmallerX && xIntersect < wall2LargerX && xIntersect > wall2SmallerX) {
                    if (xIntersect < CANVAS_WIDTH / 2) {
                        if (wall1.p1.x < xIntersect) {
                            var cutWall1 = new Wall(null, new Point(xIntersect, yIntersect), wall1.p2, null);
                        } else if (wall1.p2.x < xIntersect) {
                            var cutWall1 = new Wall(null, wall1.p1, new Point(xIntersect, yIntersect), null);
                        } else {
                            var cutWall1 = wall1;
                        }

                        if (wall2.p1.x < xIntersect) {
                            var cutWall2 = new Wall(null, new Point(xIntersect, yIntersect), wall2.p2, null);
                        } else if (wall2.p2.x < xIntersect) {
                            var cutWall2 = new Wall(null, wall2.p1, new Point(xIntersect, yIntersect), null);
                        } else {
                            var cutWall2 = new Wall(null, wall2.p1, wall2.p2, null);
                        }

                        return { wall1: cutWall1, wall2: cutWall2 };
                    } else {
                        if (wall1.p1.x > xIntersect) {
                            var cutWall1 = new Wall(null, new Point(xIntersect, yIntersect), wall1.p2, null);
                        } else if (wall1.p2.x > xIntersect) {
                            var cutWall1 = new Wall(null, wall1.p1, new Point(xIntersect, yIntersect), null);
                        } else {
                            var cutWall1 = wall1;
                        }

                        if (wall2.p1.x > xIntersect) {
                            var cutWall2 = new Wall(null, new Point(xIntersect, yIntersect), wall2.p2, null);
                        } else if (wall2.p2.x > xIntersect) {
                            var cutWall2 = new Wall(null, wall2.p1, new Point(xIntersect, yIntersect), null);
                        } else {
                            var cutWall2 = new Wall(null, wall2.p1, wall2.p2, null);
                        }

                        return { wall1: cutWall1, wall2: cutWall2 };
                    }
                } else {
                    return { wall1: wall1, wall2: wall2 };
                }
            } else {
                return { wall1: wall1, wall2: wall2 };
            }
        } else {
            return { wall1: wall1, wall2: wall2 };
        }
    } else {
        return { wall1: wall1, wall2: wall2 };
    }
}

function cutToOverlap(wall1, wall2) {
    var wall1Vector = new Vector(wall1.p2.x - wall1.p1.x, wall1.p2.y - wall1.p1.y);
    var wall2Vector = new Vector(wall2.p2.x - wall2.p1.x, wall2.p2.y - wall2.p1.y);
    var wall1SmallerX = Math.min(wall1.p1.x, wall1.p2.x);
    var wall1LargerX = Math.max(wall1.p1.x, wall1.p2.x);

    var wall1P1Transform = this.transformPoint(wall1.p1);
    var wall1P2Transform = this.transformPoint(wall1.p2);
    var wall2P1Transform = this.transformPoint(wall2.p1);
    var wall2P2Transform = this.transformPoint(wall2.p2);
    var wall1TransformSmallerX = Math.min(wall1P1Transform.x, wall1P2Transform.x);
    var wall1TransformLargerX = Math.max(wall1P1Transform.x, wall1P2Transform.x);
    var wall2TransformSmallerX = Math.min(wall2P1Transform.x, wall2P2Transform.x);
    var wall2TransformLargerX = Math.max(wall2P1Transform.x, wall2P2Transform.x);

    //is there overlap?
    if ((wall1TransformSmallerX <= wall2TransformLargerX && wall1TransformSmallerX >= wall2TransformSmallerX)
        || (wall1TransformLargerX <= wall2TransformLargerX && wall1TransformLargerX >= wall2TransformSmallerX)
        || (wall1TransformSmallerX <= wall2TransformSmallerX && wall1TransformLargerX >= wall2TransformLargerX)) {
        if (wall1P1Transform.x == wall1TransformSmallerX && wall2P1Transform.x == wall2TransformSmallerX) {
            var transformedPoints = findOverlapPoints(wall1.p1, wall1.p2, wall2.p1, wall2.p2, wall1Vector, wall2Vector);
        } else if (wall1P1Transform.x == wall1TransformSmallerX) {
            var transformedPoints = findOverlapPoints(wall1.p1, wall1.p2, wall2.p2, wall2.p1, wall1Vector, wall2Vector);
        } else if (wall2P1Transform.x == wall2TransformSmallerX) {
            var transformedPoints = findOverlapPoints(wall1.p2, wall1.p1, wall2.p1, wall2.p2, wall1Vector, wall2Vector);
        } else {
            var transformedPoints = findOverlapPoints(wall1.p2, wall1.p1, wall2.p2, wall2.p1, wall1Vector, wall2Vector);
        }
        return { wall1: new Wall(null, transformedPoints.p1Transform, transformedPoints.p2Transform, null), wall2: new Wall(null, transformedPoints.p3Transform, transformedPoints.p4Transform, null) };
    }

    return { wall1: wall1, wall2: wall2 };
}

function findT(p1, p2, v1) {
    return (p1.x * (p1.y - CANVAS_HEIGHT / 2 - 2) + p1.x * (p2.y - CANVAS_HEIGHT / 2 - 2) + CANVAS_WIDTH / 2 * (p1.y - p2.y)) / ((p1.x - CANVAS_WIDTH / 2) * v1.y - v1.x * (p2.y - CANVAS_HEIGHT / 2 - 2));
}


function movePoint(p, v, t) {
    var movedX = p.x + v.x * t;
    var movedY = p.y + v.y * t;
    var movedP = new Point(movedX, movedY);
    var movedTransformedP = this.transformPoint(movedP);
    return movedTransformedP;
}

function findOverlapPoints(wall1P1, wall1P2, wall2P1, wall2P2, wall1Vector, wall2Vector) {
    var wall1P1Transform = this.transformPoint(wall1P1);
    var wall1P2Transform = this.transformPoint(wall1P2);
    var wall2P1Transform = this.transformPoint(wall2P1);
    var wall2P2Transform = this.transformPoint(wall2P2);
    if (wall1P1Transform.x < wall2P1Transform.x) {
        let t = findT(wall1P1, wall2P1, wall1Vector);
        var wall1P1MovedTransformed = movePoint(wall1P1, wall1Vector, t);
        var wall2P1MovedTransformed = wall2P1;
    } else {
        let t = findT(wall2P1, wall1P1, wall2Vector);
        var wall2P1MovedTransformed = movePoint(wall2P1, wall2Vector, t);
        var wall1P1MovedTransformed = wall1P1;
    }
    if (wall1P2Transform.x > wall2P2Transform.x) {
        let t = findT(wall1P2, wall2P2, wall1Vector);
        var wall1P2MovedTransformed = movePoint(wall1P2, wall1Vector, t);
        var wall2P2MovedTransformed = wall2P2;
    } else {
        let t = findT(wall2P2, wall1P2, wall2Vector);
        var wall2P2MovedTransformed = movePoint(wall2P2, wall2Vector, t);
        var wall1P2MovedTransformed = wall1P2;
    }

    return { p1Transform: wall1P1MovedTransformed, p2Transform: wall1P2MovedTransformed, p3Transform: wall2P1MovedTransformed, p4Transform: wall2P2MovedTransformed };
}

function cutWall(wall) {
    var v = new Vector(wall.p2.x - wall.p1.x, wall.p2.y - wall.p1.y);
    if (500 / 6 * (wall.p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < 0) {
        if (500 / 6 * (wall.p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -CANVAS_WIDTH) {
            return null;
        } else if (500 / 6 * (wall.p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > CANVAS_WIDTH * 2) {
            var newY1 = wall.p1.y - v.y * wall.p1.x / v.x;
            var newY2 = wall.p2.y + v.y * -(wall.p2.x - CANVAS_WIDTH) / v.x;
            return new Wall(null, new Point(0, newY1), new Point(CANVAS_WIDTH, newY2), null);
        } else {
            var newY1 = wall.p1.y - v.y * wall.p1.x / v.x;
            return new Wall(null, new Point(0, newY1), new Point(wall.p2.x, wall.p2.y), null);
        }
    } else if (500 / 6 * (wall.p1.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > CANVAS_WIDTH * 2) {
        if (500 / 6 * (wall.p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -CANVAS_WIDTH) {
            var newY1 = wall.p1.y + v.y * -(wall.p1.x - CANVAS_WIDTH) / v.x;
            var newY2 = wall.p2.y - v.y * wall.p1.x / v.x;
            return new Wall(null, new Point(CANVAS_WIDTH, newY1), new Point(0, newY2), null);
        } else if (500 / 6 * (wall.p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > CANVAS_WIDTH * 2) {
            return null;
        } else {
            var newY1 = wall.p1.y + v.y * -(wall.p1.x - CANVAS_WIDTH) / v.x;
            return new Wall(null, new Point(CANVAS_WIDTH, newY1), new Point(wall.p2.x, wall.p2.y), null);
        }
    } else {
        if (500 / 6 * (wall.p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 < -CANVAS_WIDTH) {
            var newY2 = wall.p2.y - v.y * wall.p1.x / v.x;
            return new Wall(null, new Point(wall.p1.x, wall.p1.y), new Point(0, newY2), null);
        } else if (500 / 6 * (wall.p2.x - CANVAS_WIDTH / 2) + CANVAS_WIDTH / 2 > CANVAS_WIDTH * 2) {
            var newY2 = wall.p2.y + v.y * -(wall.p2.x - CANVAS_WIDTH) / v.x;
            return new Wall(null, new Point(wall.p1.x, wall.p1.y), new Point(CANVAS_WIDTH, newY2), null);
        } else {
            return new Wall(null, new Point(wall.p1.x, wall.p1.y), new Point(wall.p2.x, wall.p2.y), null);
        }
    }
}