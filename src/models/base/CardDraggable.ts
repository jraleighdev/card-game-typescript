import CardBase from "~/models/base/CardBase";
import {Scene} from "phaser";
import Pointer = Phaser.Input.Pointer;

export default class CardDraggable extends CardBase {

    originalX: number;
    originalY: number;
    draggable: boolean;
    dragging: boolean;

    constructor(public ondragend: any,
                public scene: Scene,
                public name: string,
                public x: number,
                public y: number,
                public card: string,
                public image: string,
                public depth: number,
                public spriteCard: Phaser.GameObjects.Sprite,
                public spriteImage: Phaser.GameObjects.Sprite,
                public textName: Phaser.GameObjects.BitmapText) {

        super(scene, name, x, y, card, image, depth, spriteCard, spriteImage, textName);

        this.originalX = this.x;
        this.originalY = this.y;
        this.draggable = true;
        this.dragging = false;
        this.setSize(this.spriteCard.width, this.spriteCard.height);
        this.setInteractive();
        this.scene.input.setDraggable(this);

        this.scene.input.on('drag', (pointer: Pointer, gameObject: CardDraggable, dragX: number, dragY: number) => {
            if (!this.draggable) return;
            this.dragging = true;
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.scene.input.on('dragend', (pointer: Pointer, gameObject: CardDraggable) => {
            this.dragging = false;
            gameObject.ondragend(pointer, gameObject);
        })

    }
}
