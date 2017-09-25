import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { ClueState } from '../../core/store/state';
import { PlayerService } from '../player.service';
import { Suspect } from '../../card/suspect/suspect';
import { deletePlayer, DeletePlayer, DeletedPlayer, loadPlayers, LoadedPlayers, savePlayer, SavePlayer, SavedPlayer } from './player.actions';

@Injectable()
export class PlayerEffects {

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
        .switchMap(() => this.store.select(s => s.cards))
        .map(cards => Object.values(cards)
                            .filter(c => c as Suspect !== null) as Suspect[])
        .filter(suspects => !!suspects.length)
        .switchMap(suspects => this.playerService.getAll(suspects))
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
