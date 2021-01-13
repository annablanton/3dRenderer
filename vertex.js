class Vertex {
    constructor(x, y, color) {
        Object.assign(this, { x, y, color });
    }

    normalize() {
        var length = Math.sqrt(this.x ** 2 + this.y ** 2);
        this.x /= length;
        this.y /= length;
    }
}