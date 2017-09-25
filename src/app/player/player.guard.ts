import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ClueState } from '../core/store/state';
import { LoadPlayers } from './store/player.actions';
import { playersLoaded } from './store/player.selectors';

@Injectable()
export class PlayerGuard implements CanActivate {

    constructor(private store: Store<ClueState>) {
        //
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select(playersLoaded)
                .filter(can => !can)
                .do(() => this.store.dispatch(new LoadPlayers()));
    }

}
