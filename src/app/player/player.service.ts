import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Player } from './player';
import { LocalForageService } from '../local-forage/local-forage.service';

@Injectable()
export class PlayerService {

  constructor(private localForage: LocalForageService) { }

  get(id?: number): Observable<Player> {
    return this.localForage
            .get(id)
            .map(this.cast);
  }

  save(player: Player): Observable<Player> {
    return this.localForage
            .set(player.id, player)
            .map(this.cast);
  }

  private cast = player => player as Player;
}
