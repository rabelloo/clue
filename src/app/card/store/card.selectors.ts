import { CardMap } from './card-map';
import { ClueState } from '../../core/store/state';

export function cardsSelector(state: ClueState) {
  return Object.values(state.cards);
}

export function cardsLoadedSelector(state: ClueState) {
  return !!Object.keys(state.cards).length;
}
