class MinHeap {
    constructor(length) {
        this.heap = [];
        this.nextLocation = 0;
        this.size = 0;
    }

    insert(node) {
        var curr = this.nextLocation;
        this.heap[this.nextLocation++] = node;
        var parent = curr == 0 ? 0 : Math.floor((curr - 1) / 2);
        while (this.heap[parent].element > this.heap[curr].element) {
            var temp = this.heap[parent];
            this.heap[parent] = this.heap[curr];
            this.heap[curr] = temp;
            curr = parent;
            parent = parent == 0 ? 0 : Math.floor((parent - 1) / 2);
        }
        this.size++;
    }

    removeMin() {
        var temp = this.heap[--this.nextLocation];
        //this.heap[this.nextLocation] = temp;
        this.heap[this.nextLocation] = this.heap[0];
        this.heap[0] = temp;
        var curr = 0;
        while ((curr * 2 + 1 < this.nextLocation && this.heap[curr * 2 + 1] !== undefined && this.heap[curr].element > this.heap[curr * 2 + 1].element) || (curr * 2 + 2 < this.nextLocation && this.heap[curr * 2 + 2] !== undefined && this.heap[curr].element > this.heap[curr * 2 + 2].element)) {
            temp = this.heap[curr];
            if (curr * 2 + 1 < this.nextLocation && (curr * 2 + 2 >= this.nextLocation || this.heap[curr * 2 + 1].element <= this.heap[curr * 2 + 2].element)) {
                this.heap[curr] = this.heap[curr * 2 + 1];
                this.heap[curr * 2 + 1] = temp;
                curr = curr * 2 + 1;
            } else {
                this.heap[curr] = this.heap[curr * 2 + 2];
                this.heap[curr * 2 + 2] = temp;
                curr = curr * 2 + 2;
            }
        }

        this.size--;

        return this.heap[this.nextLocation];
    }
}