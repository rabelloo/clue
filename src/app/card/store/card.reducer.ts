import { ActionReducer } from '@ngrx/store';

import { Card } from '../card';
import { CardAction, loadedCards } from './card.actions';
import { CardMap } from './card-map';

const initialState: CardMap = {};

export function CardReducer(state = initialState, action: CardAction): CardMap {
    switch (action.type) {
        case loadedCards:
            return { ...state, ...action.cards.toHashMap((c: Card) => '' + c.id) };

        default:
            return state;
    }
}
