import { HistoryAction, loadedHistory, loadHistory } from './history.actions';

const initialState = false;

export function HistoryLoadedReducer(
  state = initialState,
  action: HistoryAction
): boolean {
  switch (action.type) {
    case loadHistory:
      return false;

    case loadedHistory:
      return true;

    default:
      return state;
  }
}
