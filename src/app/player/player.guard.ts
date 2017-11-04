import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ClueState } from '../core/store/state';
import { playersLoadedSelector } from './store/player.selectors';

@Injectable()
export class PlayerGuard implements CanActivate {

    constructor(private store: Store<ClueState>) {
        //
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {      
      return this.store.select(playersLoadedSelector)
                    .pipe(
                        filter(loaded => loaded)
                    );
    }

}
