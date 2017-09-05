import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Player } from './player';
import { LocalForageIdTable } from '../core/local-forage/local-forage-id-table';
import { LocalForageService } from '../core/local-forage/local-forage.service';

@Injectable()
export class PlayerService {

  private readonly tableName = 'Players';
  players: LocalForageIdTable<Player>

  constructor(private localForage: LocalForageService) {
    this.players = localForage.getIdTable<Player>(this.tableName, Player);
  }
  
  getAll(): Observable<Player[]> {
    return this.players.getAll().map(players => players.sortBy(player => player.name));
  }

  get(id: number): Observable<Player> {
    return this.players.get(id);
  }

  save(player: Player): Observable<Player> {
    return this.players.save(player);
  }

  delete(player: Player): Observable<void> {
    return this.players.delete(player);
  }

}
