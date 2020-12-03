import MainScene from "./scenes/MainScene";
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    width: 640,
    height: 1024,
    backgroundColor: '#333333',
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [MainScene]
};

new Phaser.Game(config);
