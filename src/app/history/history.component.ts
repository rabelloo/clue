import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AddTurn, DeleteTurn, SaveTurn } from './store/history.actions';
import { CardSelectors } from '../card/store/card.selectors';
import { ClueState } from '../core/store/state';
import { HistorySelectors } from './store/history.selectors';
import { Player } from '../player/player';
import { PlayerSelectors } from '../player/store/player.selectors';
import { Room } from '../card/room/room';
import { Round } from './round/round';
import { Suspect } from '../card/suspect/suspect';
import { Turn } from './turn-form/turn';
import { Weapon } from '../card/weapon/weapon';

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
