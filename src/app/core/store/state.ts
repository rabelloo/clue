import { CardMap } from '../../card/store/card-map';
import { PlayerMap } from '../../player/store/player-map';

export interface ClueState {
    cards: CardMap;
    players: PlayerMap;
    playersLoaded: boolean;
}
