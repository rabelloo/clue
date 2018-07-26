import { Action } from '@ngrx/store';
import { User } from 'firebase';

export const signIn    = '[Auth] sign in';
export const signedIn  = '[Auth] signed in';
export const signOut   = '[Auth] sign out';

export class SignIn implements Action {
    readonly type = signIn;
}

export class SignedIn implements Action {
    readonly type = signedIn;

    constructor(public user: User) { }
}

export class SignOut implements Action {
    readonly type = signOut;

    constructor(public user: User) { }
}

export type AuthAction
    = SignIn
    | SignedIn
    | SignOut
    ;
