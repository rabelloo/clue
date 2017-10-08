import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ClueState } from './core/store/state';
import { LoadCards } from './card/store/card.actions';
import { LoadHistory } from './history/store/history.actions';
import { LoadPlayers } from './player/store/player.actions';

@Component({
  selector: 'clue-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<ClueState>) {
    this.store.dispatch(new LoadCards());
    this.store.dispatch(new LoadHistory());
    this.store.dispatch(new LoadPlayers());
  }

}
