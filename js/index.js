import GameState from './States/GameState.js'

class Game extends Phaser.Game {
    constructor() {
        super(600, 360, Phaser.AUTO);
        this.state.add('GameState', GameState);
        this.state.start('GameState');
    }
};
new Game();