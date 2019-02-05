import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ClueState } from '../store/state';
import { SignedIn, signIn, signOut } from './auth.actions';

@Injectable()
export class AuthEffects {
  private authSub: Subscription;

  @Effect({ dispatch: false })
  auth: Observable<Action> = this.actions.pipe(
    ofType(signIn),
    filter(() => !this.authSub || this.authSub.closed),
    tap(() => this.afAuth.auth.signInAnonymously()),
    tap(() => {
      this.authSub = this.afAuth.authState
        .pipe(
          map(
            ({ displayName, email, isAnonymous, photoURL, uid }) =>
              ({ displayName, email, isAnonymous, photoURL, uid } as User)
          ),
          tap(user => this.store.dispatch(new SignedIn(user)))
        )
        .subscribe();
    })
  );

  @Effect({ dispatch: false })
  unAuth: Observable<Action> = this.actions.pipe(
    ofType(signOut),
    tap(() => this.authSub.unsubscribe()),
    tap(() => this.afAuth.auth.signOut())
  );

  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private store: Store<ClueState>
  ) {}
}
