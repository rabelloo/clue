import { User } from 'firebase';

import { Card } from '../../card/card';
import { HashMap } from './hash-map';
import { Player } from '../../player/player';
import { Turn } from '../../history/turn-form/turn';

export interface ClueState {
    cards: HashMap<Card>;
    history: HashMap<Turn>;
    historyLoaded: boolean;
    players: HashMap<Player>;
    user: User;
}
