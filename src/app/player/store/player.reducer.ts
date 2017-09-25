import { ActionReducer } from '@ngrx/store';

import { Player } from '../player';
import { PlayerAction, deletedPlayer, loadedPlayers, savedPlayer } from './player.actions';
import { PlayerMap } from './player-map';

const initialState: PlayerMap = {};

export const PlayerReducer: ActionReducer<PlayerMap> =
    (state = initialState, action: PlayerAction) => {
        switch (action.type) {
            case deletedPlayer:
                const { [action.player.id]: deleted, ...rest } = state;
                return rest;

            case loadedPlayers:
                return { ...state, ...action.players.toHashMap((p: Player) => '' + p.id) };

            case savedPlayer:
                return { ...state, [action.player.id]: action.player };
                
            default:
                return state;
    }
}