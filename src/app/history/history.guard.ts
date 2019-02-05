import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClueState } from '../core/store/state';
import { LoadHistory } from './store/history.actions';
import { historyLoadedSelector } from './store/history.selectors';

@Injectable({ providedIn: 'root' })
export class HistoryGuard implements CanActivate {
  constructor(private store: Store<ClueState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.store.dispatch(new LoadHistory());

    return this.store
      .select(historyLoadedSelector)
      .pipe(filter(loaded => loaded));
  }
}
