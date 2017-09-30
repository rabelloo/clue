import { CardReducer } from '../../card/store/card.reducer';
import { PlayersLoadedReducer } from '../../player/store/players-loaded.reducer';
import { PlayerReducer } from '../../player/store/player.reducer';

export const reducers = {
    cards: CardReducer,
    players: PlayerReducer,
    playersLoaded: PlayersLoadedReducer,
};
