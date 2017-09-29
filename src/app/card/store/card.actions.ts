import { Action } from '@ngrx/store';

import { Card } from '../card';

export const loadCards   = '[Cards] Load';
export const loadedCards = '[Cards] Loaded';

export class LoadCards implements Action {
    readonly type = loadCards;
}

export class LoadedCards implements Action {
    readonly type = loadedCards;

    constructor(public cards: Card[]) { }
}

export type CardAction
    = LoadCards
    | LoadedCards
    ;
