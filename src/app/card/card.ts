export interface Card {
    id: number;
    name: string;
    type: CardType;
    picture: string;
    disabled: boolean;
}

export enum CardType {
    room = 'Room',
    suspect = 'Suspect',
    weapon = 'Weapon',
}