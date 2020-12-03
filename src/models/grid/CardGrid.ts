import CardBase from "~/models/base/CardBase";
import {Scene} from "phaser";

export default class CardGrid extends CardBase {
    selected = false;
    dead = false;

    constructor(public value: number,
                public cardType: string,
                public scene: Scene,
                public name: string,
                public x: number,
                public y: number,
                public card: string,
                public image: string,
                public depth: number,
                public spriteCard: Phaser.GameObjects.Sprite,
                public spriteImage: Phaser.GameObjects.Sprite,
                public textName: Phaser.GameObjects.BitmapText,
                public textValue: Phaser.GameObjects.BitmapText) {
        super(scene, name, x, y, card, image, depth, spriteCard, spriteImage, textName);
        this.add(this.textValue);

        this.setValue(value);
    }

    setValue(newValue: number) {
        this.value = newValue;
        this.textValue.text = this.value.toString();
        this.textValue.x = -45 - this.textValue.width / 2;
        this.textValue.tint = 0;
    }

    setHighlighted(highLight: boolean) {
        if (highLight) {
            const color = 0xcccc88;
            this.spriteCard.tint = color;
            this.spriteImage.tint = color;
        } else {
            const color = 0xffffff
            this.spriteCard.tint = color;
            this.spriteImage.tint = color;
        }
    }

    setDead() {
        this.dead = true;
        this.deathAnimation();
    }
}
