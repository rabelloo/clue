import { Card } from '../../card/card';
import { Player } from '../../player/player';

export interface Disprove {
    playerId: number;
    player: Player;

    cardId: number;
    card: Card;
}
