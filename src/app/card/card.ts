export interface Card {
    id: number;
    name: string;
    type: CardType;
    picture: string;
    disabled: boolean;
}

export type CardType
    = 'room'
    | 'suspect'
    | 'weapon';
