import { ClueState } from '../../core/store/state';
import { Player } from '../player';
import { CardSelectors } from '../../card/store/card.selectors';


export const PlayerSelectors = {
  playerCount: playerCountSelector,
  players: playersSelector,
  playersLoaded: playersLoadedSelector,
}

export function playerCountSelector(state: ClueState): number {
  return Object.keys(state.players).length;
}

export function playersSelector(state: ClueState): Player[] {
  return Object.values(state.players)
              .sortBy((p: Player) => p.order)
              .map((p: Player) => ({
                  ...p,
                  character: CardSelectors.suspects(state)
                                .find(s => s.id === p.characterId)
              }));
}

export function playersLoadedSelector(state: ClueState): boolean {
  return state.playersLoaded;
}
