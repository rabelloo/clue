import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  
  getAll(): Observable<Player[]> {
    return this.players.getAll();
  }

  get(id: number): Observable<Player> {
    return this.players.get(id);
  }

  save(player: Player): Observable<Player> {
    return this.players.save(player);
  }
}
