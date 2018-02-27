import { CardReducer } from '../../card/store/card.reducer';
import { HistoryLoadedReducer } from '../../history/store/history-loaded.reducer';
import { HistoryReducer } from '../../history/store/history.reducer';
import { PlayerReducer } from '../../player/store/player.reducer';

export const reducers = {
    cards: CardReducer,
    history: HistoryReducer,
    historyLoaded: HistoryLoadedReducer,
    players: PlayerReducer,
};
