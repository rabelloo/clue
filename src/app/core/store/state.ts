import { User } from 'firebase';
import { Card } from '../../card/card';
import { Turn } from '../../history/turn-form/turn';
import { Player } from '../../player/player';
import { HashMap } from './hash-map';

export interface ClueState {
  cards: HashMap<Card>;
  history: HashMap<Turn>;
  historyLoaded: boolean;
  players: HashMap<Player>;
  user: User;
}
