import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CardService } from '../card.service';
import { loadCards, LoadedCards } from './card.actions';

@Injectable()
export class CardEffects {
  @Effect() loadCards: Observable<Action> = this.actions.pipe(
    ofType(loadCards),
    switchMap(() => this.cardService.get()),
    map(cards => new LoadedCards(cards))
  );

  constructor(private actions: Actions, private cardService: CardService) {}
}
