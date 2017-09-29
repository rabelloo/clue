import { Action } from '@ngrx/store';

import { Player } from '../player';

export const playerCount = '[PlayerCount] Count';

export class PlayerCount implements Action {
    readonly type = playerCount;

    constructor (public count: number) { }
}

export type PlayerCountAction
    = PlayerCount
    ;
