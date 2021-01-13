class Point {
    constructor(x, y) {
        Object.assign(this, { x, y });
    }

    normalize() {
        var length = Math.sqrt(this.x ** 2 + this.y ** 2);
        this.x /= length;
        this.y /= length;
    }
}