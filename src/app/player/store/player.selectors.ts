import { ClueState } from '../../core/store/state';
import { Player } from '../player';
import { Suspect } from '../../card/suspect/suspect';

export const PlayerSelectors = {
  all,
  count,
};

function all(state: ClueState): Player[] {
  return Object.values(state.players)
               .sortBy((p: Player) => p.order)
               .map((p: Player) => ({
                   ...p,
                   character: state.cards[p.characterId] as Suspect
               }));
}

function count(state: ClueState): number {
  return Object.keys(state.players).length;
}
