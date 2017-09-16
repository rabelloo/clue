import { Card } from '../card';

export class Suspect extends Card {
    color: string;

    constructor(init?: Partial<Suspect>) {
        super();
        Object.assign(this, init);
    }
}
