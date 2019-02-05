import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { ClueState } from '../../core/store/state';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import {
  DeletedPlayer,
  DeletePlayer,
  PlayerActionTypes,
  SavedPlayer,
  SavePlayer,
} from './player.actions';
import { PlayerSelectors } from './player.selectors';

@Injectable()
export class PlayerEffects {
  private syncSub: Subscription;

  @Effect()
  create = this.actions.pipe(
    ofType(PlayerActionTypes.create),
    switchMap(() => this.store.select(PlayerSelectors.count).pipe(first())),
    map((count: number) => ({ order: count + 1, name: '' } as Player)),
    map(player => new SavePlayer(player))
  );

  @Effect({ dispatch: false })
  delete = this.actions.pipe(
    ofType<DeletePlayer>(PlayerActionTypes.delete),
    tap(action => this.playerService.delete(action.player))
  );

  @Effect({ dispatch: false })
  save = this.actions.pipe(
    ofType<SavePlayer>(PlayerActionTypes.save),
    tap(action => this.playerService.save(action.player))
  );

  @Effect({ dispatch: false })
  sync = this.actions.pipe(
    ofType(PlayerActionTypes.sync),
    filter(() => !this.syncSub || this.syncSub.closed),
    tap(() => {
      this.syncSub = this.playerService
        .stateChanges()
        .pipe(tap(events => events.forEach(e => this.dispatch(e))))
        .subscribe();
    })
  );

  @Effect({ dispatch: false })
  unsync = this.actions.pipe(
    ofType(PlayerActionTypes.unsync),
    tap(() => this.syncSub.unsubscribe())
  );

  constructor(
    private actions: Actions,
    private playerService: PlayerService,
    private store: Store<ClueState>
  ) {}

  private dispatch(event: DocumentChangeAction<Player>) {
    const player = {
      ...event.payload.doc.data(),
      id: event.payload.doc.id,
    } as Player;

    const action =
      event.type === 'removed'
        ? new DeletedPlayer(player)
        : new SavedPlayer(player);

    this.store.dispatch(action);
  }
}
