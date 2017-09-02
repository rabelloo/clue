
export abstract class Card {
    id: Number
    name: string
    picture: string

    constructor(init?:Partial<Card>) {
        Object.assign(this, init);
    }
}
