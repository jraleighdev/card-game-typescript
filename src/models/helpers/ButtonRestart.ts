import {Scene} from "phaser";
import {GameImages} from "~/enums/gameImages";

export function AddButtonRestart(scene: Scene) {
    const restartButton = scene.add.image(+scene.game.config.width / 2, +scene.game.config.height / 2, GameImages.restartbutton);
    restartButton.depth = 2;
    restartButton.setInteractive();
    restartButton.on('pointerover', () => (restartButton.tint = 0xcccccc));
    restartButton.on('pointerout', () => (restartButton.tint = 0xffffff));
    restartButton.on('pointerdown', () => {
        restartButton.tint = 0xffffff;
        scene.scene.restart();
    });
}
