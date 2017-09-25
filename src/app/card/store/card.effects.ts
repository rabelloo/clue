import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { CardService } from '../card.service';
import { loadCards, LoadedCards } from './card.actions';

@Injectable()
export class CardEffects {

  @Effect() loadCards: Observable<Action> =
    this.actions.ofType(loadCards)
        .switchMap(() => this.cardService.get())
        .map(cards => new LoadedCards(cards));

  constructor(
      private actions: Actions,
      private cardService: CardService
  ) { }

}
