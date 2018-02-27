import { AuthEffects } from '../auth/auth.effects';
import { CardEffects } from '../../card/store/card.effects';
import { HistoryEffects } from '../../history/store/history.effects';
import { PlayerEffects } from '../../player/store/player.effects';

export const effects = [
    AuthEffects,
    CardEffects,
    HistoryEffects,
    PlayerEffects,
];
