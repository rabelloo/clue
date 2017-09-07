import { Turn } from '../turn/turn';

export class Round {
    number: number = 1
    turns: Turn[] = []

    constructor(init?: Partial<Round>) {
        Object.assign(this, init);
    }
}
