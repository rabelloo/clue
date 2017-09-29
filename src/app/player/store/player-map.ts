import { Player } from '../player';

export interface PlayerMap {
    [playerId: number]: Player;
}
