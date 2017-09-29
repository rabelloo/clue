import { CardReducer } from '../../card/store/card.reducer';
import { PlayerCountReducer } from '../../player/store/player-count.reducer';
import { PlayerReducer } from '../../player/store/player.reducer';

export const reducers = {
    cards: CardReducer,
    players: PlayerReducer,
    playerCount: PlayerCountReducer,
};
