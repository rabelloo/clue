export class Player {
    id: number;
    name = '';
    order: number;
    characterId: number;
    cardIds: number[] = [];

    constructor(init?: Partial<Player>) {
        Object.assign(this, init);
    }
}
