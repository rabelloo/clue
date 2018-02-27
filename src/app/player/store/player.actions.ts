import { Action } from '@ngrx/store';

import { Player } from '../player';

export const addPlayer     = '[Players] add';
export const deletePlayer  = '[Players] delete';
export const deletedPlayer = '[Players] deleted';
export const savePlayer    = '[Players] save';
export const savedPlayer   = '[Players] saved';
export const syncPlayers   = '[Players] sync';
export const unsyncPlayers = '[Players] unsync';

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

export class SavePlayer implements Action {
    readonly type = savePlayer;

    constructor(public player: Player) { }
}

export class SavedPlayer implements Action {
    readonly type = savedPlayer;

    constructor(public player: Player) { }
}

export class SyncPlayers implements Action {
    readonly type = syncPlayers;
}

export class UnsyncPlayers implements Action {
    readonly type = unsyncPlayers;
}

export type PlayerAction
    = AddPlayer
    | DeletePlayer
    | DeletedPlayer
    | SavePlayer
    | SavedPlayer
    | SyncPlayers
    | UnsyncPlayers
    ;
