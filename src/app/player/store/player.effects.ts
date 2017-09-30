import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { ClueState } from '../../core/store/state';
import { PlayerService } from '../player.service';
import { Suspect } from '../../card/suspect/suspect';
import { addPlayer, deletePlayer, DeletePlayer, DeletedPlayer,
         loadPlayers, LoadedPlayers, savePlayer, SavePlayer, SavedPlayer } from './player.actions';
import { playerCountSelector } from './player.selectors';

@Injectable()
export class PlayerEffects {

  @Effect() addPlayer: Observable<Action> =
    this.actions.ofType(addPlayer)
        .switchMap(() => this.store.select(playerCountSelector))
        .map(playerCount => ({ id: undefined, name: '', order: playerCount + 1 }))
        .map(player => new SavePlayer(player));

  @Effect() deletePlayer: Observable<Action> =
    this.actions.ofType(deletePlayer)
        .map((action: DeletePlayer) => action.player)
        .switchMap(player => this.playerService
                                  .delete(player)
                                  .filter(deleted => deleted)
                                  .map(() => player))
        .filter(player => !!player)
        .map(player => new DeletedPlayer(player));

  @Effect() loadPlayers: Observable<Action> =
    this.actions.ofType(loadPlayers)
        .switchMap(() => this.playerService.getAll())
        .defaultIfEmpty([])
        .map(players => new LoadedPlayers(players));

  @Effect() savePlayer: Observable<Action> =
    this.actions.ofType(savePlayer)
        .map((action: SavePlayer) => action.player)
        .switchMap(player => this.playerService.save(player))
        .map(player => new SavedPlayer(player));

  constructor(
      private actions: Actions,
      private playerService: PlayerService,
      private store: Store<ClueState>
  ) { }

}
