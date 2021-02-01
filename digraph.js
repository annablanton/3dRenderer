class Digraph {
    constructor(vertex) {
        this.nextIndex = 0;
        this.adjacencyList = [];
        this.adjacencyList.push(new LinkedList());
        this.vertices = [];
        this.vertices[this.nextIndex] = vertex;
        this.nextIndex++;
    }

    addDirectedEdge(vertexKey1, vertexKey2) {

        this.adjacencyList[vertexKey1].add(vertexKey2);
    }

    addVertex(vertex) {
        this.adjacencyList.push(new LinkedList());
        this.vertices[this.nextIndex] = vertex;
        //for (var i = 0; i < this.vertices.length; i++) {
        //    this.adjacencyList[this.nextIndex][i] = false;
        //}
        //for (var i = 0; i < this.nextIndex; i++) {
        //    this.adjacencyList[i][this.nextIndex] = false;
        //}
        this.nextIndex++;
    }

    removeVertex(vertexKey) {
        var ret = this.vertices.splice(vertexKey, 1);
        this.adjacencyList.forEach(function (ll) {
            var curr = ll.head;
            while (curr.elem === vertexKey) {
                ll.head = ll.head.next;
                curr = ll.head;
            }

            if (curr !== null) {
                var prev = curr;
                curr = curr.next;
                while (curr.next != null) {
                    if (curr.elem === vertexKey) {
                        prev.next = curr.next;
                    }
                }
            }
        });
        this.adjacencyList.splice(vertexKey, 1);
        return ret;
    }
}