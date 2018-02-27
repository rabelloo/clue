import { Injectable } from '@angular/core';
import { DocumentChangeType } from '@firebase/firestore-types';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { switchMap, map, first, filter, tap } from 'rxjs/operators';

import { ClueState } from '../../core/store/state';
import { Player } from '../player';
import { PlayerService } from '../player.service';

import { addPlayer, deletePlayer, DeletePlayer, DeletedPlayer,
         savePlayer, SavePlayer, SavedPlayer, syncPlayers, unsyncPlayers } from './player.actions';
import { PlayerSelectors } from './player.selectors';

@Injectable()
export class PlayerEffects {

  private syncSub: Subscription;

  @Effect() addPlayer: Observable<Action> =
    this.actions.ofType(addPlayer)
        .pipe(
          switchMap(() => this.store.select(PlayerSelectors.count).pipe( first() )),
          map(playerCount => ({ order: playerCount + 1, name: '' })),
          map(player => new SavePlayer(player as Player)),
        );

  @Effect({ dispatch: false }) deletePlayer: Observable<Action> =
    this.actions.ofType(deletePlayer)
        .pipe(
          tap((action: DeletePlayer) => this.playerService.delete(action.player)),
        );

  @Effect({ dispatch: false }) savePlayer: Observable<Action> =
    this.actions.ofType(savePlayer)
        .pipe(
          tap((action: SavePlayer) => this.playerService.save(action.player))
        );

  @Effect({ dispatch: false }) sync: Observable<Action> =
    this.actions.ofType(syncPlayers)
        .pipe(
          filter(() => !this.syncSub || this.syncSub.closed),
          tap(() => this.syncSub
                  = this.playerService
                        .stateChanges()
                        .pipe(
                          tap(events => events.forEach(e => this.dispatch(e))),
                        )
                        .subscribe()
          ),
        );

  @Effect({ dispatch: false }) unsync: Observable<Action> =
    this.actions.ofType(unsyncPlayers)
        .pipe(
          tap(() => this.syncSub.unsubscribe()),
        );

  constructor(
      private actions: Actions,
      private playerService: PlayerService,
      private store: Store<ClueState>
  ) { }

  private dispatch(event: DocumentChangeAction) {
    const player = {
      ...event.payload.doc.data(),
      id: event.payload.doc.id,
    } as Player;

    const action = event.type === 'removed'
                  ? new DeletedPlayer(player)
                  : new SavedPlayer(player);

    this.store.dispatch(action);
  }

}
