import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { cardsLoadedSelector } from './store/card.selectors';
import { ClueState } from '../core/store/state';


@Injectable()
export class CardGuard implements CanActivate {

  constructor(private store: Store<ClueState>) {
      //
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(cardsLoadedSelector)
                  .filter(loaded => loaded);
  }

}
