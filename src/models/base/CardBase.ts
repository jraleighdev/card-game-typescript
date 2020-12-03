import {Scene} from "phaser";

export default class CardBase extends Phaser.GameObjects.Container {

    constructor(public scene: Scene,
                public name: string,
                public x: number,
                public y: number,
                public card: string,
                public image: string,
                public depth: number,
                public spriteCard: Phaser.GameObjects.Sprite,
                public spriteImage: Phaser.GameObjects.Sprite,
                public textName: Phaser.GameObjects.BitmapText) {
        super(scene, x, y, [spriteCard, spriteImage, textName]);
        this.cardText = name;
        this.scene.add.existing(this);
    }


    set cardText(newName: string) {
        this.name = newName;
        this.textName.text = this.name;
        this.textName.maxWidth = this.spriteCard.width;
        this.textName.tint = 0;
        this.textName.x = -this.textName.width / 2;
        this.textName.y = 120 - this.textName.height;
    }

    deathAnimation() {
        this.scene.tweens.add({
            targets: this.spriteImage,
            alpha: 0,
            duration: 100,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
                this.spriteImage.setTexture('dead')
            }
        })
    }
}
