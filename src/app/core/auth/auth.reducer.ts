import { ActionReducer } from '@ngrx/store';
import { User } from 'firebase';

import { AuthAction, signedIn, signOut } from './auth.actions';

const initialState = {} as User;

export function AuthReducer(state = initialState, action: AuthAction): User {
    switch (action.type) {
        case signedIn:
            return action.user;

        case signOut:
            return initialState;

        default:
            return state;
    }
}
