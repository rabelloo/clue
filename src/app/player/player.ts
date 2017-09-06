export class Player {
    id: number
    name: string = ''
    order: number
    characterId: number
    cardIds: number[] = []

    constructor(init?: Partial<Player>) {
        Object.assign(this, init);
    }
}
