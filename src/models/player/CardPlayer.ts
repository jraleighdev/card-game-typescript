import CardDraggable from "~/models/base/CardDraggable";
import {Scene} from "phaser";

export default class CardPlayer extends CardDraggable {

    dead = false;

    constructor(public ondragend: any,
                public scene: Scene,
                public name: string,
                public x: number,
                public y: number,
                public health: number,
                public maxHealth: number,
                public armor: number,
                public card: string,
                public image: string,
                public depth: number,
                public spriteCard: Phaser.GameObjects.Sprite,
                public spriteImage: Phaser.GameObjects.Sprite,
                public textName: Phaser.GameObjects.BitmapText,
                public textHealth: Phaser.GameObjects.BitmapText,
                public maxHealthText: Phaser.GameObjects.BitmapText,
                public armorText: Phaser.GameObjects.BitmapText,
                public spriteArmor: Phaser.GameObjects.Sprite) {

        super(ondragend, scene, name, x, y, card, image, depth, spriteCard, spriteImage, textName);

        this.textHealth.tint = 0;
        this.maxHealthText.tint = 0;
        this.add([this.textHealth, this.maxHealthText, this.spriteArmor, this.armorText]);
        this.health = health

        this.setHealth(this.health);
        this.setArmor(this.armor);
    }

    setHealth(newHealth: number) {
        this.health = newHealth;
        this.textHealth.text = this.health.toString();
        this.textHealth.x = -44 - this.textHealth.width / 2;
    }
    
    setMaxHealth(newMaxHealth: number) {
        this.maxHealth = newMaxHealth;
    }
    
    setArmor(newArmor: number) {
        this.armor = newArmor;
        this.armorText.text = this.armor.toString();
        this.armorText.x = 47 - this.armorText.width / 2;
        const alpha = this.armor === 0 ? 0 : 1;
        this.armorText.alpha = alpha;
        this.spriteArmor.alpha = alpha;
    }

    attack(value: number) {
        if (value <= this.armor) {
            this.setArmor(this.armor - value);
        } else {
            this.setHealth(this.health - (value - this.armor));
            this.setArmor(0);
        }
        if (this.health <= 0) {
            this.setDead();
        }
    }

    setDead() {
        this.dead = true;
        this.setHealth(0);
        this.cardText = 'Dead';
        this.draggable = false;
        this.deathAnimation();
    }
}
