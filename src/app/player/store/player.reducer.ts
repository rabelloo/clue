import { HashMap } from '../../core/store/hash-map';
import { Player } from '../player';
import { PlayerAction, PlayerActionTypes } from './player.actions';

const initialState: HashMap<Player> = {};

export function PlayerReducer(
  state = initialState,
  action: PlayerAction
): HashMap<Player> {
  switch (action.type) {
    case PlayerActionTypes.deleted:
      const { [action.player.id]: deleted, ...rest } = state;
      return rest;

    case PlayerActionTypes.saved:
      return { ...state, [action.player.id]: action.player };

    default:
      return state;
  }
}
