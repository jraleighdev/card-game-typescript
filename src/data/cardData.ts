import {GameImages} from "~/enums/gameImages";
import {CardTypes} from "~/enums/cardTypes";

export const cardData = [
  {
    name: 'Minor Healing Potion',
    value: 3,
    image: GameImages.healingpotion,
    type: CardTypes.heal
  },
  {
    name: 'Major Healing Potion',
    value: 6,
    image: GameImages.healingpotion,
    type: CardTypes.heal
  },
  {
    name: 'Shield',
    value: 5,
    image: GameImages.shield,
    type: CardTypes.armor
  },
  {
    name: 'Kobold',
    value: 6,
    image: GameImages.kobold,
    type: CardTypes.attack
  },
  {
    name: 'Troll',
    value: 8,
    image: GameImages.troll,
    type: CardTypes.attack
  },
  {
    name: 'Ogre',
    value: 10,
    image: GameImages.orge,
    type: CardTypes.attack
  },
  {
    name: 'Death Knight',
    value: 12,
    image: GameImages.deathknight,
    type: CardTypes.attack
  },
  {
    name: 'Fire Drake',
    value: 16,
    image: GameImages.firedrake,
    type: CardTypes.attack
  },
  {
    name: 'Golden Dragon',
    value: 20,
    image: GameImages.goldendragon,
    type: CardTypes.attack
  }
];

export default cardData;
