import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Player } from './player';
import { PlayerService } from './player.service';

@Injectable()
export class PlayerResolver implements Resolve<Player[]> {

    constructor(private playerService: PlayerService) {
        //
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.playerService.getAll();
    }

}
