import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ClueState } from '../core/store/state';
import { historyLoadedSelector } from './store/history.selectors';

@Injectable()
export class HistoryGuard implements CanActivate {

    constructor(private store: Store<ClueState>) {
        //
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
      return this.store.select(historyLoadedSelector)
                    .filter(loaded => loaded);
    }

}
