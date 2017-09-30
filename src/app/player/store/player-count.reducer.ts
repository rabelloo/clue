import { ActionReducer } from '@ngrx/store';

import { loadedPlayers, PlayerAction } from './player.actions';

const initialState = 0;

export function PlayerCountReducer(state = initialState, action: PlayerAction): number {
    switch (action.type) {
        case loadedPlayers:
            return action.players.length;

        default:
            return state;
    }
}
