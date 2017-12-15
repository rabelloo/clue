import { ClueState } from '../../core/store/state';
import { Player } from '../player';
import { Suspect } from '../../card/suspect/suspect';

export const PlayerSelectors = {
  all: playersSelector,
  count: playerCountSelector,
  loaded: playersLoadedSelector,
};

export function playerCountSelector(state: ClueState): number {
  return Object.keys(state.players).length;
}

export function playersSelector(state: ClueState): Player[] {
  return Object.values(state.players)
               .sortBy((p: Player) => p.order)
               .map((p: Player) => ({
                   ...p,
                   character: state.cards[p.characterId] as Suspect
               }));
}

export function playersLoadedSelector(state: ClueState): boolean {
  return state.playersLoaded;
}
