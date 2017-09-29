import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ClueState } from '../core/store/state';
import { LocalForageIdTable } from '../core/local-forage/local-forage-id-table';
import { LocalForageService } from '../core/local-forage/local-forage.service';
import { Notifier } from '../core/notifier/notifier.service';
import { Player } from './player';
import { PlayerCount } from './store/player-count.actions';
import { Suspect } from '../card/suspect/suspect';
import { LoadPlayers } from './store/player.actions';

@Injectable()
export class PlayerService {

  players: LocalForageIdTable<Player>;
  private readonly tableName = 'Players';

  constructor(private localForageService: LocalForageService,
              private store: Store<ClueState>,
              private notifier: Notifier) {
    this.players = localForageService.getIdTable<Player>(this.tableName);
  }

  getAll(suspects: Suspect[]): Observable<Player[]> {
    return this.players.getAll()
                .defaultIfEmpty([])
                .map(players => players
                                .sortBy(p => p.order)
                                .map(p => ({ ...p, character: suspects.find(s => s.id === p.characterId) }))
                )
                .do(p => this.store.dispatch(new PlayerCount(p.length)));
  }

  get(id: number): Observable<Player> {
    return this.players.get(id);
  }

  save(player: Player): Observable<Player> {
    return this.players.save(player);
  }

  delete(player: Player): Observable<boolean> {
    const message = `Are you sure you want to delete player ${player.name || '"Unnamed"'}?`;

    if (this.notifier.confirm(message)) {
      return this.players.delete(player).map(() => true);
    }

    return Observable.of(false);
  }

}
