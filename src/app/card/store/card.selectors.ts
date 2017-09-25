import { CardMap } from './card-map';
import { ClueState } from '../../core/store/state';

export function cardsLoaded(state: ClueState) {
  return !!Object.keys(state.cards).length;
}
