import { ClueState } from '../../core/store/state';

export function playersSelector(state: ClueState) {
  return Object.values(state.players);
}

export function playersLoadedSelector(state: ClueState) {
  return Object.keys(state.players).length === state.playerCount;
}
