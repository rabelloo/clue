import { ActionReducer } from '@ngrx/store';

import { playerCount, PlayerCountAction } from './player-count.actions';

const initialState = 0;

export function PlayerCountReducer(state = initialState, action: PlayerCountAction): number {
    switch (action.type) {
        case playerCount:
            return action.count;

        default:
            return state;
    }
}
