import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { cardsLoaded } from './store/card.selectors';
import { ClueState } from '../core/store/state';
import { LoadCards } from './store/card.actions';


@Injectable()
export class CardGuard implements CanActivate {

  constructor(private store: Store<ClueState>) {
      //
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new LoadCards());

    return this.store.select(cardsLoaded)
                .filter(can => can);
  }

}
