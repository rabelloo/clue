import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { defaultIfEmpty, filter, first, map, switchMap } from 'rxjs/operators';
import { ClueState } from '../../core/store/state';
import { Turn } from '../turn-form/turn';
import { TurnService } from '../turn-form/turn.service';
import {
  addTurn,
  DeletedTurn,
  deleteTurn,
  DeleteTurn,
  LoadedHistory,
  loadHistory,
  SavedTurn,
  saveTurn,
  SaveTurn,
} from './history.actions';
import { nextRoundSelector } from './history.selectors';

@Injectable()
export class HistoryEffects {
  @Effect() addTurn: Observable<Action> = this.actions.pipe(
    ofType(addTurn),
    switchMap(() => this.store.select(nextRoundSelector).pipe(first())),
    map(next => this.createNextTurn(next)),
    map(turn => new SaveTurn(turn))
  );

  @Effect() deleteTurn: Observable<Action> = this.actions.pipe(
    ofType(deleteTurn),
    map((action: DeleteTurn) => action.turn),
    switchMap(turn =>
      this.turnService.delete(turn).pipe(
        filter(deleted => deleted),
        map(() => turn)
      )
    ),
    filter(turn => !!turn),
    map(turn => new DeletedTurn(turn))
  );

  @Effect() loadHistory: Observable<Action> = this.actions.pipe(
    ofType(loadHistory),
    switchMap(() => this.turnService.getAll().pipe(defaultIfEmpty([]))),
    map(turns => new LoadedHistory(turns))
  );

  @Effect() saveTurn: Observable<Action> = this.actions.pipe(
    ofType(saveTurn),
    map((action: SaveTurn) => action.turn),
    switchMap(turn => this.turnService.save(turn).pipe(map(t => turn))),
    map(turn => new SavedTurn(turn))
  );

  constructor(
    private actions: Actions,
    private turnService: TurnService,
    private store: Store<ClueState>
  ) {}

  private createNextTurn(next: {
    round: number;
    turn: number;
    playerId: string;
  }): Turn {
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
