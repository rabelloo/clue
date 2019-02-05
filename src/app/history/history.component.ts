import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Room } from '../card/room/room';
import { CardSelectors } from '../card/store/card.selectors';
import { Suspect } from '../card/suspect/suspect';
import { Weapon } from '../card/weapon/weapon';
import { ClueState } from '../core/store/state';
import { Player } from '../player/player';
import { PlayerSelectors } from '../player/store/player.selectors';
import { Round } from './round/round';
import { AddTurn, DeleteTurn, SaveTurn } from './store/history.actions';
import { HistorySelectors } from './store/history.selectors';
import { Turn } from './turn-form/turn';

@Component({
  selector: 'clue-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {
  players: Observable<Player[]>;
  rounds: Observable<Round[]>;
  rooms: Observable<Room[]>;
  suspects: Observable<Suspect[]>;
  weapons: Observable<Weapon[]>;

  constructor(private store: Store<ClueState>) {
    this.rounds = this.store.select(HistorySelectors.rounds);
    this.players = this.store.select(PlayerSelectors.all);
    this.rooms = this.store.select(CardSelectors.rooms);
    this.suspects = this.store.select(CardSelectors.suspects);
    this.weapons = this.store.select(CardSelectors.weapons);
  }

  addTurn() {
    this.store.dispatch(new AddTurn());
  }

  onSave(turn: Turn): void {
    this.store.dispatch(new SaveTurn(turn));
  }

  onRemove(turn: Turn): void {
    this.store.dispatch(new DeleteTurn(turn));
  }
}
