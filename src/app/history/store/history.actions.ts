import { Action } from '@ngrx/store';

import { Round } from '../round/round';
import { Turn } from '../turn-form/turn';

export const addTurn       = '[History] Add turn';
export const deleteTurn    = '[History] Delete turn';
export const deletedTurn   = '[History] Deleted turn';
export const loadHistory   = '[History] Load';
export const loadedHistory = '[History] Loaded';
export const saveTurn      = '[History] Save turn';
export const savedTurn     = '[History] Saved turn';

export class AddTurn implements Action {
    readonly type = addTurn;
}

export class DeleteTurn implements Action {
    readonly type = deleteTurn;

    constructor(public turn: Turn) { }
}

export class DeletedTurn implements Action {
    readonly type = deletedTurn;

    constructor(public turn: Turn) { }
}

export class LoadHistory implements Action {
    readonly type = loadHistory;
}

export class LoadedHistory implements Action {
    readonly type = loadedHistory;

    constructor(public history: Turn[]) { }
}

export class SaveTurn implements Action {
    readonly type = saveTurn;

    constructor(public turn: Turn) { }
}

export class SavedTurn implements Action {
    readonly type = savedTurn;

    constructor(public turn: Turn) { }
}

export type HistoryAction
    = AddTurn
    | DeleteTurn
    | DeletedTurn
    | LoadHistory
    | LoadedHistory
    | SaveTurn
    | SavedTurn
    ;
