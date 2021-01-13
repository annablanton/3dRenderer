class Map {
    constructor(game, player, mapGraph) {
        Object.assign(this, {game, player, mapGraph });
    }

    update() {
        
    }

    draw(ctx) {
        this.player.draw(ctx);
        this.mapGraph.draw(ctx);
    }
}