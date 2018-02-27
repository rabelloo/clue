import { ActionReducer } from '@ngrx/store';

import { AuthAction } from './auth.actions';

const initialState = {};

export function AuthReducer(state = initialState, action: AuthAction) {
    return state;
}
