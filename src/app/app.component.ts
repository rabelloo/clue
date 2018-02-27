import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ClueState } from './core/store/state';
import { LoadCards } from './card/store/card.actions';
import { SignIn } from './core/auth/auth.actions';

@Component({
  selector: 'clue-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(store: Store<ClueState>) {
    store.dispatch(new LoadCards());
    store.dispatch(new SignIn());
  }

}
