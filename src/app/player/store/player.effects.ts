import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, first, filter, defaultIfEmpty } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { ClueState } from '../../core/store/state';
import { Player } from '../player';
import { PlayerService } from '../player.service';

import { addPlayer, deletePlayer, DeletePlayer, DeletedPlayer,
         loadPlayers, LoadedPlayers, savePlayer, SavePlayer, SavedPlayer } from './player.actions';
import { playerCountSelector } from './player.selectors';

@Injectable()
export class PlayerEffects {

  @Effect() addPlayer: Observable<Action> =
    this.actions.ofType(addPlayer)
        .pipe(
          switchMap(() => this.store.select(playerCountSelector).pipe( first() )),
          map(playerCount => this.createPlayer(playerCount)),
          map(player => new SavePlayer(player)),
        );

  @Effect() deletePlayer: Observable<Action> =
    this.actions.ofType(deletePlayer)
        .pipe(
          map((action: DeletePlayer) => action.player),
          switchMap(player => this.playerService
                                  .delete(player)
                                  .pipe(
                                    filter(deleted => deleted),
                                    map(() => player))
                                  ),
          filter(player => !!player),
          map(player => new DeletedPlayer(player)),
        );

  @Effect() loadPlayers: Observable<Action> =
    this.actions.ofType(loadPlayers)
        .pipe(
          switchMap(() => this.playerService.getAll().pipe( defaultIfEmpty([]) )),
          map(players => new LoadedPlayers(players))
        );

  @Effect() savePlayer: Observable<Action> =
    this.actions.ofType(savePlayer)
        .pipe(
          map((action: SavePlayer) => action.player),
          switchMap(player => this.playerService.save(player)),
          map(player => new SavedPlayer(player)),
        );

  constructor(
      private actions: Actions,
      private playerService: PlayerService,
      private store: Store<ClueState>
  ) { }

  private createPlayer(playerCount: number): Player {
    return {
      id: undefined,
      name: '',
      order: playerCount + 1,
      cardIds: undefined,
      character: undefined,
      characterId: undefined,
    };
  }

}
