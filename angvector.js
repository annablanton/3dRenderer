class TwoDVector {
    constructor(direction) {
        this.x = Math.cos(direction);
        this.y = Math.sin(direction);
    }

    normalize() {
        var length = Math.sqrt(this.x ** 2 + this.y ** 2);
        this.x /= length;
        this.y /= length;
    }
}