import CardGrid from "~/models/grid/CardGrid";
import {Scene} from "phaser";
import cardData from "~/data/cardData";
import {GameImages} from "~/enums/gameImages";
import Sprite = Phaser.GameObjects.Sprite;
import BitmapText = Phaser.GameObjects.BitmapText;

export default class Grid {

    cards: CardGrid[] = [];
    private readonly pressstart = 'pressstart';

    constructor(public scene: Scene,
                public columns: number,
                public rows: number,
                public xOffset: number,
                public yOffset: number,
                public yStart: number) {

        this.addCards(0);
    }

    addCards(startIndex: number) {
        for (let i = startIndex; i < this.columns * this.rows; i++) {

            const cardType = cardData[Math.floor(Math.random() * cardData.length)];

            this.cards.push(this.createCard(
                cardType.name,
                 this.xOffset + (+this.scene.game.config.width / 2 - this.xOffset) * (i % this.columns),
                 this.yStart - this.yOffset * Math.floor(i / this.columns),
                 GameImages.card,
                 cardType.image,
                  cardType.value,
                cardType.type,
                0));
        }
    }

    private createCard(name: string,
                       x: number,
                       y: number,
                       card: string,
                       image: string,
                       value: number,
                       cardType: string,
                       depth: number) {

        return new CardGrid(
            value,
            cardType,
            this.scene,
            name,
            x,
            y,
            card,
            image,
            depth,
            new Sprite(this.scene, 0, 0,card),
            new Sprite(this.scene, 0,0,image),
            new BitmapText(this.scene,0,0,this.pressstart, name, 16),
            new BitmapText(this.scene,0,-100,this.pressstart, value.toString()));
    }

    fadeFrontRow() {
        setTimeout(() => {
            this.cards.splice(0, 3).forEach(card => {
                card.destroy();
            })
            this.cards.forEach(card => {
               this.scene.tweens.add({
                   targets: card,
                   duration: 400,
                   y: card.y + this.yOffset,
                   onComplete: () => this.addBackRow()
               })
            });
        }, 1000)

        this.cards.slice(0, 3).forEach(card => {
           if (!card.selected) {
               this.scene.tweens.add({
                   targets: card,
                   alpha: 0,
                   duration: 200
               })
           }
        });
    }

    private addBackRow() {
        if (this.cards.length >= this.columns * this.rows) return;
        this.addCards(6);
    }
}
