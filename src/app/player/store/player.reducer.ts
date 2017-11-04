import { ActionReducer } from '@ngrx/store';

import { HashMap } from '../../core/store/hash-map';
import { Player } from '../player';
import { PlayerAction, deletedPlayer, loadedPlayers, savedPlayer, savePlayer } from './player.actions';

const initialState: HashMap<Player> = {};

export function PlayerReducer(state = initialState, action: PlayerAction): HashMap<Player> {
    switch (action.type) {
        case deletedPlayer:
            const { [action.player.id]: deleted, ...rest } = state;
            return rest;

        case loadedPlayers:
            return { ...state, ...action.players.toHashMap((p: Player) => p.id) };

        case savePlayer:
            return { ...state, [action.player.id]: action.player };

        default:
            return state;
    }
}
