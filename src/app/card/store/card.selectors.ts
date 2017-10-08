import { Card } from '../card';
import { ClueState } from '../../core/store/state';
import { Player } from '../../player/player';
import { PlayerSelectors } from '../../player/store/player.selectors';
import { Room } from '../room/room';
import { Suspect } from '../suspect/suspect';
import { Weapon } from '../weapon/weapon';

export const CardSelectors = {
  all: cardsSelector,
  count: cardCountSelector,
  loaded: cardsLoadedSelector,
  max: maxCardsSelector,
  rooms: roomsSelector,
  suspects: suspectsSelector,
  weapons: weaponsSelector,
  validCharactersFor: (player: Player) => validCharactersForSelector(player),
  validRoomsFor: (player: Player) => validRoomsForSelector(player),
  validSuspectsFor: (player: Player) => validSuspectsForSelector(player),
  validWeaponsFor: (player: Player) => validWeaponsForSelector(player),
}

export function cardCountSelector(state: ClueState): number {
  return Object.keys(state.cards).length;
}

export function cardsSelector(state: ClueState): Card[] {
  return Object.values(state.cards);
}

export function cardsLoadedSelector(state: ClueState): boolean {
  return !!cardCountSelector(state);
}

export function maxCardsSelector(state: ClueState): number {
  const cardCount = cardCountSelector(state);
  const playerCount = PlayerSelectors.count(state);

  return (cardCount - 3) / (playerCount < 3 ? 3 : playerCount);
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

export function validCharactersForSelector(player: Player) {
  return function (state: ClueState): Suspect[] {
    const invalidCharacterIds = otherPlayersCharacterIds(player, state);
    return suspectsSelector(state)
            .filter(r => !invalidCharacterIds.includes(r.id))
  }
}

export function validRoomsForSelector(player: Player) {
  return function (state: ClueState): Room[] {
    const invalidCardIds = otherPlayersCardIds(player, state);
    return roomsSelector(state)
            .filter(r => !invalidCardIds.includes(r.id))
  }
}

export function validSuspectsForSelector(player: Player) {
  return function (state: ClueState): Suspect[] {
    const invalidCardIds = otherPlayersCardIds(player, state);
    return suspectsSelector(state)
            .filter(r => !invalidCardIds.includes(r.id))
  }
}

export function validWeaponsForSelector(player: Player) {
  return function (state: ClueState): Weapon[] {
    const invalidCardIds = otherPlayersCardIds(player, state);
    return weaponsSelector(state)
            .filter(r => !invalidCardIds.includes(r.id))
  }
}


////////////


function otherPlayersCharacterIds(player: Player, state: ClueState): number[] {
  return otherPlayers(player, state)
              .map((p: Player) => p.characterId);
}

function otherPlayersCardIds(player: Player, state: ClueState): number[] {
  return otherPlayers(player, state)
              .flatMap((p: Player) => p.cardIds);
}

function otherPlayers(player: Player, state: ClueState): Player[] {
  return Object.values(state.players)
              .filter(p => p.id !== player.id);
}
