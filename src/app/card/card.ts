
export abstract class Card {
    id: number;
    name: string;
    picture: string;

    constructor(init?: Partial<Card>) {
        Object.assign(this, init);
    }
}
