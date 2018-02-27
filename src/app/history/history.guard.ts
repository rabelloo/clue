import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ClueState } from '../core/store/state';
import { LoadHistory } from './store/history.actions';
import { historyLoadedSelector } from './store/history.selectors';

@Injectable()
export class HistoryGuard implements CanActivate {

    constructor(private store: Store<ClueState>) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> {
      this.store.dispatch(new LoadHistory());

      return this.store.select(historyLoadedSelector)
                    .pipe(
                        filter(loaded => loaded)
                    );
    }

}
