function topologicalSort(digraph) {
    //topological sort algorithm borrowed from https://courses.cs.washington.edu/courses/cse326/03wi/lectures/RaoLect20.pdf
    var inDegreeArray = [];
    var vertices = digraph.vertices;
    var adjacencyList = digraph.adjacencyList;
    for (var i = 0; i < vertices.length; i++) {
        inDegreeArray.push(0);
    }

    for (var i = 0; i < adjacencyList.length; i++) {
        //for (var j = 0; j < adjacencyList[i].length; j++) {
        //    if (adjacencyList[i][j]) {
        //        inDegreeArray[i]++;
        //    }
        //}
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
                var wall1 = cutWall(walls[i]);
                var wall2 = cutWall(walls[j]);

                var cutWalls = cutAtIntersect(wall1, wall2);

                wall1 = cutWalls.wall1;
                wall2 = cutWalls.wall2;
                if (wall1 != null && wall2 != null) {

                    var v1 = new Vector(wall1.p2.x - wall1.p1.x, wall1.p2.y - wall1.p1.y);
                    var v2 = new Vector(wall2.p2.x - wall2.p1.x, wall2.p2.y - wall2.p1.y);
                    var wall1SmallerX = Math.min(wall1.p1.x, wall1.p2.x);
                    var wall1LargerX = Math.max(wall1.p1.x, wall1.p2.x);
                    var wall1SmallerY = Math.min(wall1.p1.y, wall1.p2.y);
                    var wall2SmallerX = Math.min(wall2.p1.x, wall2.p2.x);
                    var wall2LargerX = Math.max(wall2.p1.x, wall2.p2.x);

                    //if (!(wall1.p1.x == wall2.p1.x && wall1.p1.y == wall2.p1.y) && !(wall1.p1.x == wall2.p2.x && wall1.p1.x == wall2.p2.y)
                    //    && !(wall1.p2.x == wall2.p1.x && wall1.p2.y == wall2.p1.y) && !(wall1.p2.x == wall2.p2.x && wall1.p2.y == wall2.p2.y)) {
                    var wall2P1BehindWall1 = wall2.p1.y < wall1.p1.y + v1.y * (wall2.p1.x - wall1.p1.x) / v1.x && wall2.p1.x >= wall1SmallerX && wall2.p1.x <= wall1LargerX;
                    var wall2P2BehindWall1 = wall2.p2.y < wall1.p1.y + v1.y * (wall2.p2.x - wall1.p1.x) / v1.x && wall2.p2.x >= wall1SmallerX && wall2.p2.x <= wall1LargerX;
                    var wall2StretchedBehindWall1 = wall2SmallerX <= wall1SmallerX && wall2LargerX >= wall1LargerX
                        && (wall1.p1.y > wall2.p1.y + v2.y * (wall1.p1.x - wall2.p1.x) / v2.x || wall1.p2.y > wall2.p1.y + v2.y * (wall1.p2.x - wall2.p1.x) / v2.x);
                    var wallStretched = wall2SmallerX <= wall1SmallerX && wall2LargerX >= wall1LargerX;
                    var wall2BehindWall1 = wall1.p1.y > wall2.p1.y + v2.y * (wall1.p1.x - wall2.p1.x) / v2.x || wall1.p2.y > wall2.p1.y + v2.y * (wall1.p2.x - wall2.p1.x) / v2.x;
                    var rhs = wall2.p1.y + v2.y * (wall1.p1.x - wall2.p1.x) / v2.x;
                    var lhs = wall1.p1.y;

                    if (v1.x != 0) {
                        if (wall2P1BehindWall1 || wall2P2BehindWall1 || wall2StretchedBehindWall1) {
                            dg.addDirectedEdge(j, i);
                        }
                    }
                }
            }
        }
    }

    return dg;
}

function cutAtIntersect(wall1, wall2) {
    if (wall1 != null && wall2 != null) {
        var wall1Origin = wall1.p1;
        var wall2Origin = wall2.p1;

        var wall1Vector = new Vector(wall1.p2.x - wall1.p1.x, wall1.p2.y - wall1.p1.y);
        var wall2Vector = new Vector(wall2.p2.x - wall2.p1.x, wall2.p2.y - wall2.p1.y);
        if (wall1Vector.x != 0) {
            var eq = (wall2Vector.x + wall2Origin.x - wall1Origin.x) / wall1Vector.x;
            var u = (wall1Origin.y - wall2Origin.y + wall1Vector.y * eq) / wall2Vector.y;
            var t = (wall2Vector.x * u + wall2Origin.x - wall1Origin.x) / wall1Vector.x;

            var xIntersect = wall1Origin.x + wall1Vector.x * t;
            var yIntersect = wall1Origin.y + wall1Vector.y * t;

            var wall1SmallerX = Math.min(wall1.p1.x, wall1.p2.x);
            var wall1LargerX = Math.max(wall1.p1.x, wall1.p2.x);

            var wall2SmallerX = Math.min(wall2.p1.x, wall2.p2.x);
            var wall2LargerX = Math.max(wall2.p1.x, wall2.p2.x);

            if (xIntersect <= wall1LargerX && xIntersect >= wall1SmallerX && xIntersect <= wall2LargerX && xIntersect >= wall2SmallerX) {
                if (xIntersect < CANVAS_WIDTH / 2) {
                    if (wall1.p1.x <= xIntersect) {
                        var cutWall1 = new Wall(null, new Point(xIntersect, yIntersect), wall1.p2, null);
                    } else if (wall1.p2.x <= xIntersect) {
                        var cutWall1 = new Wall(null, wall1.p1, new Point(xIntersect, yIntersect), null);
                    } else {
                        var cutWall1 = wall1;
                    }

                    if (wall2.p1.x <= xIntersect) {
                        var cutWall2 = new Wall(null, new Point(xIntersect, yIntersect), wall2.p2, null);
                    } else if (wall2.p2.x <= xIntersect) {
                        var cutWall2 = new Wall(null, wall2.p1, new Point(xIntersect, yIntersect), null);
                    } else {
                        var cutWall2 = new Wall(null, wall2.p1, wall2.p2, null);
                    }

                    return { wall1: cutWall1, wall2: cutWall1 };
                } else {
                    if (wall1.p1.x >= xIntersect) {
                        var cutWall1 = new Wall(null, new Point(xIntersect, yIntersect), wall1.p2, null);
                    } else if (wall1.p2.x >= xIntersect) {
                        var cutWall1 = new Wall(null, wall1.p1, new Point(xIntersect, yIntersect), null);
                    } else {
                        var cutWall1 = wall1;
                    }

                    if (wall2.p1.x >= xIntersect) {
                        var cutWall2 = new Wall(null, new Point(xIntersect, yIntersect), wall2.p2, null);
                    } else if (wall2.p2.x >= xIntersect) {
                        var cutWall2 = new Wall(null, wall2.p1, new Point(xIntersect, yIntersect), null);
                    } else {
                        var cutWall2 = new Wall(null, wall2.p1, wall2.p2, null);
                    }

                    return { wall1: cutWall1, wall2: cutWall2 };
                }
            } else {
                return { wall1: wall1, wall2: wall2 };
            }
        } else if (!(wall2Vector.x == 0)) {
            var xIntersect = wall2Origin.x + wall2Vector.x * (wall1Origin.x - wall2Origin.x) / wall2Vector.y;
            var yIntersect = wall2Origin.y + wall2Vector.y * (wall1Origin.y - wall2Origin.y) / wall2Vector.x;
            if (xIntersect < CANVAS_WIDTH / 2) {
                if (wall2.p1.x <= xIntersect) {
                    var cutWall2 = new Wall(null, new Point(xIntersect, yIntersect), wall2.p2, null);
                } else if (wall2.p2.x <= xIntersect) {
                    var cutWall2 = new Wall(null, new wall2.p1, new Point(xIntersect, yIntersect), null);
                } else {
                    var cutWall2 = wall2;
                }

                return { wall1: wall1, wall2: cutWall2 };
            } else {
                if (wall2.p1.x >= xIntersect) {
                    var cutWall2 = new Wall(null, new Point(xIntersect, yIntersect), wall2.p2, null);
                } else if (wall2.p2.x >= xIntersect) {
                    var cutWall2 = new Wall(null, new wall2.p1, new Point(xIntersect, yIntersect), null);
                } else {
                    var cutWall2 = wall2;
                }

                return { wall1: wall1, wall2: cutWall2 };
            }
        } else {
            return { wall1: wall1, wall2: wall2 };
        }
    } else {
        return { wall1: wall1, wall2: wall2 };
    }
}

function cutWall(wall) {
    var v = new Vector(wall.p2.x - wall.p1.x, wall.p2.y - wall.p1.y);
    if (wall.p1.x < 0) {
        if (wall.p2.x < 0) {
            return null;
        } else if (wall.p2.x > CANVAS_WIDTH) {
            var newY1 = wall.p1.y - v.y * wall.p1.x / v.x;
            var newY2 = wall.p2.y + v.y * -(wall.p2.x - CANVAS_WIDTH) / v.x;
            return new Wall(null, new Point(0, newY1), new Point(CANVAS_WIDTH, newY2), null);
        } else {
            var newY1 = wall.p1.y - v.y * wall.p1.x / v.x;
            return new Wall(null, new Point(0, newY1), new Point(wall.p2.x, wall.p2.y), null);
        }
    } else if (wall.p1.x > CANVAS_WIDTH) {
        if (wall.p2.x < 0) {
            var newY1 = wall.p1.y + v.y * -(wall.p1.x - CANVAS_WIDTH) / v.x;
            var newY2 = wall.p2.y - v.y * wall.p1.x / v.x;
            return new Wall(null, new Point(CANVAS_WIDTH, newY1), new Point(0, newY2), null);
        } else if (wall.p2.x > CANVAS_WIDTH) {
            return null;
        } else {
            var newY1 = wall.p1.y + v.y * -(wall.p1.x - CANVAS_WIDTH) / v.x;
            return new Wall(null, new Point(CANVAS_WIDTH, newY1), new Point(wall.p2.x, wall.p2.y), null);
        }
    } else {
        if (wall.p2.x < 0) {
            var newY2 = wall.p2.y - v.y * wall.p1.x / v.x;
            return new Wall(null, new Point(wall.p1.x, wall.p1.y), new Point(0, newY2), null);
        } else if (wall.p2.x > CANVAS_WIDTH) {
            var newY2 = wall.p2.y + v.y * -(wall.p2.x - CANVAS_WIDTH) / v.x;
            return new Wall(null, new Point(wall.p1.x, wall.p1.y), new Point(CANVAS_WIDTH, newY2), null);
        } else {
            return new Wall(null, new Point(wall.p1.x, wall.p1.y), new Point(wall.p2.x, wall.p2.y), null);
        }
    }
}