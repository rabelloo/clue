import { Disprove } from './disprove';
import { Suggestion } from './suggestion';
import { Player } from '../../player/player';

export interface Turn {
    id: number;
    round: number;
    order: number;

    playerId: number;
    player: Player;

    suggestion: Suggestion;
    disprove: Disprove;
}
