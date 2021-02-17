class Tile {
    constructor() {
        this.left = false;
        this.right = false;
        this.top = false;
        this.bottom = false;
        this.occupied = false;
    }

    leave() {
        this.occupied = false;
    }

    enter() {
        this.occupied = true;
    }

    addWall(side) {
        switch (side) {
            case 'left':
                this.left = true;
                break;
            case 'right':
                this.right = true;
                break;
            case 'top':
                this.top = true;
                break;
            case 'bottom':
                this.bottom = true;
                break;
        }
    }
}