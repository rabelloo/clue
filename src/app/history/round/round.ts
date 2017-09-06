import { Turn } from '../turn/turn';

export class Round {
    number: number
    turns: Turn[]

    constructor(init?: Partial<Round>) {
        Object.assign(this, init);
    }
}
