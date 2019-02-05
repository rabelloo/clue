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
import { cardsLoadedSelector } from './store/card.selectors';

@Injectable({ providedIn: 'root' })
export class CardGuard implements CanActivate {
  constructor(private store: Store<ClueState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store
      .select(cardsLoadedSelector)
      .pipe(filter(loaded => loaded));
  }
}
