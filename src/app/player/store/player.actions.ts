import { Action } from '@ngrx/store';

import { Player } from '../player';

export const addPlayer     = '[Players] Add';
export const deletePlayer  = '[Players] Delete';
export const deletedPlayer = '[Players] Deleted';
export const loadPlayers   = '[Players] Load';
export const loadedPlayers = '[Players] Loaded';
export const savePlayer    = '[Players] Save';
export const savedPlayer   = '[Players] Saved';

export class AddPlayer implements Action {
    readonly type = addPlayer;
}

export class DeletePlayer implements Action {
    readonly type = deletePlayer;

    constructor(public player: Player) { }
}

export class DeletedPlayer implements Action {
    readonly type = deletedPlayer;

    constructor(public player: Player) { }
}

export class LoadPlayers implements Action {
    readonly type = loadPlayers;
}

export class LoadedPlayers implements Action {
    readonly type = loadedPlayers;

    constructor(public players: Player[]) { }
}

export class SavePlayer implements Action {
    readonly type = savePlayer;

    constructor(public player: Player) { }
}

export class SavedPlayer implements Action {
    readonly type = savedPlayer;

    constructor(public player: Player) { }
}

export type PlayerAction
    = AddPlayer
    | DeletePlayer
    | DeletedPlayer
    | LoadPlayers
    | LoadedPlayers
    | SavePlayer
    | SavedPlayer
    ;
