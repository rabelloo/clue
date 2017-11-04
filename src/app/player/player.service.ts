import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LocalForageIdTable } from '../core/local-forage/local-forage-id-table';
import { LocalForageService } from '../core/local-forage/local-forage.service';
import { Notifier } from '../core/notifier/notifier.service';
import { Player } from './player';

@Injectable()
export class PlayerService {

  players: LocalForageIdTable<Player>;
  private readonly tableName = 'Players';

  constructor(private localForageService: LocalForageService,
              private notifier: Notifier) {
    this.players = localForageService.getIdTable<Player>(this.tableName);
  }

  getAll(): Observable<Player[]> {
    return this.players.getAll();
  }

  get(id: number): Observable<Player> {
    return this.players.get(id);
  }

  save(player: Player): Observable<Player> {
    return this.players.save({ ...player, character: undefined });
  }

  delete(player: Player): Observable<boolean> {
    const message = `Are you sure you want to delete player ${player.name || '"Unnamed"'}?`;

    if (this.notifier.confirm(message)) {
      return this.players.delete(player)
                 .pipe(
                   map(() => true)
                 );
    }

    return of(false);
  }

}
