import { ActionReducer } from '@ngrx/store';

import { Card } from '../card';
import { CardAction, loadedCards } from './card.actions';
import { CardMap } from './card-map';

const initialState: CardMap = {};

export const CardReducer: ActionReducer<CardMap> =
    (state = initialState, action: CardAction) => {
        switch (action.type) {
            case loadedCards:
                return { ...state, ...action.cards.toHashMap((c: Card) => '' + c.id) };
        
            default:
                return state;
        }
    }
