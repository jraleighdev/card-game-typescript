import {Scene} from 'phaser';
import {GameImages} from "~/enums/gameImages";
import CardPlayer from "~/models/player/CardPlayer";
import CardGrid from "~/models/grid/CardGrid";
import Grid from "~/models/grid/Grid";
import Sprite = Phaser.GameObjects.Sprite;
import BitmapText = Phaser.GameObjects.BitmapText;
import Pointer = Phaser.Input.Pointer;
import {CardTypes} from "~/enums/cardTypes";
import {AddButtonRestart} from "~/models/helpers/ButtonRestart";

export default class MainScene extends Scene {

    player!: CardPlayer;
    grid!: Grid;
    highlighted: CardGrid | undefined;
    private readonly pressstart = 'pressstart';

    constructor() {
        super('MainScene');
    }

    preload() {

        Object.values(GameImages).forEach(image => {
           this.load.image(image, `images/${image}.png`);
        });

        this.load.bitmapFont(this.pressstart, 'font/pressstart.png', 'font/pressstart.fnt');
    }

    create() {
        this.grid = new Grid(
            this,
            3,
            3,
             120,
            280,
            +this.game.config.height / 2);

        this.createPlayer();
    }

    private createPlayer() {

        const health = 16;
        this.player = new CardPlayer(
            (pointer: Pointer, gameObject: CardPlayer) => {
                gameObject.x = gameObject.originalX;
                gameObject.y = gameObject.originalY;
                if (this.highlighted) {
                    this.player.originalX = this.player.x = this.highlighted.x;
                    this.highlighted.selected = true;
                    switch (this.highlighted.cardType) {
                        case CardTypes.attack:
                            this.player.attack(this.highlighted.value);
                            this.highlighted.setDead();
                            break;
                        case CardTypes.armor:
                            this.player.setArmor(this.highlighted.value)
                            break;
                        case CardTypes.heal:
                            this.player.setHealth(Math.min(this.player.health + this.highlighted.value, this.player.maxHealth));
                            break;
                    }
                }

                if (this.player.dead) {
                    AddButtonRestart(this);
                } else {
                    this.grid.fadeFrontRow();
                }
            },
            this,
            'Paladin',
            +this.game.config.width / 2,
            +this.game.config.height - 200,
            health,
            health,
            0,
            'playercard',
            'paladin',
            1,
            new Sprite(this, 0, 0, 'playercard'),
            new Sprite(this, 0, 0, 'paladin'),
            new BitmapText(this,0, 0, this.pressstart, 'Paladin', 16, Phaser.GameObjects.BitmapText.ALIGN_CENTER),
            new BitmapText(this,0, -102, this.pressstart, health.toString()),
            new BitmapText(this,-20, -90, this.pressstart, health.toString(), 12),
            new BitmapText(this,0, -102, this.pressstart, ''),
            new Sprite(this, 50, -80, 'armor'),
        );
    }

    update(time, delta) {
        this.grid.cards[0].setHighlighted(false);
        this.grid.cards[1].setHighlighted(false);
        this.grid.cards[2].setHighlighted(false);

        this.highlighted = undefined;

        const columnWidth = +this.game.config.width / this.grid.columns;
        const xDiff = Math.abs(this.player.x - this.player.originalX);

        if (this.player.y < 700 && xDiff < columnWidth * 1.4) {
            if (this.player.x < columnWidth) {
                this.setHighlight(this.grid.cards[0]);
            } else if (this.player.x > columnWidth * 2) {
                this.setHighlight(this.grid.cards[2]);
            } else {
                this.setHighlight(this.grid.cards[1]);
            }
        }
    }

    private setHighlight(card: CardGrid) {
        card.setHighlighted(true);
        this.highlighted = card;
    }

}
