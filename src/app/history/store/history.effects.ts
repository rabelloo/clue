import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, first, filter, defaultIfEmpty } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { ClueState } from '../../core/store/state';
import { Turn } from '../turn-form/turn';
import { TurnService } from '../turn-form/turn.service';

import { addTurn, deleteTurn, DeleteTurn, DeletedTurn,
         loadHistory, LoadedHistory, saveTurn, SaveTurn, SavedTurn } from './history.actions';
import { nextRoundSelector } from './history.selectors';

@Injectable()
export class HistoryEffects {

  @Effect() addTurn: Observable<Action> =
    this.actions.ofType(addTurn)
        .pipe(
          switchMap(() => this.store.select(nextRoundSelector).pipe( first() )),
          map(next => this.createNextTurn(next)),
          map(turn => new SaveTurn(turn)),
        );

  @Effect() deleteTurn: Observable<Action> =
    this.actions.ofType(deleteTurn)
        .pipe(
          map((action: DeleteTurn) => action.turn),
          switchMap(turn => this.turnService
                                .delete(turn)
                                .pipe(
                                    filter(deleted => deleted),
                                    map(() => turn)
                                )),
          filter(turn => !!turn),
          map(turn => new DeletedTurn(turn)),
        );

  @Effect() loadHistory: Observable<Action> =
    this.actions.ofType(loadHistory)
        .pipe(
          switchMap(() => this.turnService.getAll().pipe( defaultIfEmpty([]) )),
          map(turns => new LoadedHistory(turns)),
        );

  @Effect() saveTurn: Observable<Action> =
    this.actions.ofType(saveTurn)
        .pipe(
          map((action: SaveTurn) => action.turn),
          switchMap(turn => this.turnService.save(turn).pipe( map(t => turn) )),
          map(turn => new SavedTurn(turn)),
        );;

  constructor(
      private actions: Actions,
      private turnService: TurnService,
      private store: Store<ClueState>
  ) { }

  private createNextTurn(next: { round: number, turn: number, playerId: number }): Turn {
    return {
      id: undefined,
      order: next.turn,
      round: next.round,
      playerId: next.playerId,
      player: undefined,
      disprove: undefined,
      suggestion: undefined,
    };
  }

}
