export class Turn {
    id: number
    round: number
    playerId: number
    suggestion: {
        roomId: number
        suspectId: number
        weaponId: number
    }
    disprove: {
        playerId: number
        cardId: number
    }
    
    constructor(init?: Partial<Turn>) {
        Object.assign(this, init);
    }
}
