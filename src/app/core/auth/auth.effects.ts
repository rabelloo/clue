import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ClueState } from '../../core/store/state';

import { signIn, signOut, SignedIn } from './auth.actions';

@Injectable()
export class AuthEffects {

  private authSub: Subscription;

  @Effect({ dispatch: false }) auth: Observable<Action> =
    this.actions.ofType(signIn)
        .pipe(
          filter(() => !this.authSub || this.authSub.closed),
          tap(action => this.afAuth.auth.signInAnonymously()),
          tap(() => this.authSub
                  = this.afAuth.authState
                        .pipe(
                          tap(user => this.store.dispatch(new SignedIn(user))),
                        )
                        .subscribe()
          ),
        );

  @Effect({ dispatch: false }) unAuth: Observable<Action> =
    this.actions.ofType(signOut)
        .pipe(
          tap(() => this.authSub.unsubscribe()),
          tap(() => this.afAuth.auth.signOut()),
        );

  constructor(
      private actions: Actions,
      private afAuth: AngularFireAuth,
      private store: Store<ClueState>
  ) { }

}
