import { ClueState } from '../../core/store/state';
import { PlayerMap } from './player-map';

export function playersLoaded(state: ClueState) {
  return !!Object.keys(state.players).length;
}