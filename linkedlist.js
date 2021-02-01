class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(elem) {
        if (this.head === null) {
            this.head = new Node(elem);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(elem);
            this.tail = this.tail.next;
        }
    }
}

class Node {
    constructor(elem) {
        this.elem = elem;
        this.next = null;
    }
}