import { Player } from '../../player/player';
import { Disprove } from './disprove-form/disprove';
import { Suggestion } from './suggestion-form/suggestion';

export interface Turn {
  id: number;
  round: number;
  order: number;

  playerId: string;
  player: Player;

  suggestion: Suggestion;
  disprove: Disprove;
}
