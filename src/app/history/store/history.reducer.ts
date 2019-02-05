import { HashMap } from '../../core/store/hash-map';
import { Turn } from '../turn-form/turn';
import {
  deletedTurn,
  HistoryAction,
  loadedHistory,
  savedTurn,
} from './history.actions';

const initialState: HashMap<Turn> = {};

export function HistoryReducer(
  state = initialState,
  action: HistoryAction
): HashMap<Turn> {
  switch (action.type) {
    case deletedTurn:
      const { [action.turn.id]: deleted, ...rest } = state;
      return rest;

    case loadedHistory:
      return { ...state, ...action.history.toHashMap((p: Turn) => p.id) };

    case savedTurn:
      return { ...state, [action.turn.id]: action.turn };

    default:
      return state;
  }
}
