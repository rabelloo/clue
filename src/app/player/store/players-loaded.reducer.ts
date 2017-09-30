import { ActionReducer } from '@ngrx/store';

import { loadedPlayers, loadPlayers, PlayerAction } from './player.actions';

const initialState = false;

export function PlayersLoadedReducer(state = initialState, action: PlayerAction): boolean {
    switch (action.type) {
        case loadPlayers:
            return false;

        case loadedPlayers:
            return true;

        default:
            return state;
    }
}
