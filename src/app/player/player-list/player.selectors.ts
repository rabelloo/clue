import { ClueState } from '../../core/store/state';

export function playersLoaded(state: ClueState) {
  return !!Object.keys(state.players).length;
}