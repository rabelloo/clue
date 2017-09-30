import { Card, CardType } from '../card';
import { CardMap } from './card-map';
import { ClueState } from '../../core/store/state';
import { Room } from '../room/room';
import { Suspect } from '../suspect/suspect';
import { Weapon } from '../weapon/weapon';

export function cardCountSelector(state: ClueState): number {
  return Object.keys(state.cards).length;
}

export function cardsSelector(state: ClueState): Card[] {
  return Object.values(state.cards);
}

export function cardsLoadedSelector(state: ClueState): boolean {
  return !!cardCountSelector(state);
}

export function roomsSelector(state: ClueState): Room[] {
  return cardsSelector(state)
            .filter((c: Card) => c.type === 'room');
}

export function suspectsSelector(state: ClueState): Suspect[] {
  return cardsSelector(state)
            .filter((c: Card) => c.type === 'suspect')
            .map(c => c as Suspect);
}

export function weaponsSelector(state: ClueState): Weapon[] {
  return cardsSelector(state)
            .filter((c: Card) => c.type === 'weapon');
}
