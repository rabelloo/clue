import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Player } from './player';
import { LocalForageTable } from '../local-forage/local-forage-table';
import { LocalForageService } from '../local-forage/local-forage.service';

@Injectable()
export class PlayerService {

  private readonly tableName = 'Players';
  players: LocalForageTable<Player>

  constructor(private localForage: LocalForageService) {
    this.players = localForage.getTable<Player>(this.tableName);
  }

  get(id?: number): Observable<Player> {
    return this.players
            .get(id);
  }

  save(player: Player): Observable<Player> {
    return this.players
            .set(player.id, player);
  }
}
