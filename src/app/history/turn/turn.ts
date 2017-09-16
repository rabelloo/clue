import { Disprove } from './disprove';
import { Suggestion } from './suggestion';
import { Player } from '../../player/player';

export class Turn {
    id: number;
    round = 1;
    order = 1;

    playerId: number;
    player = new Player();

    suggestion = new Suggestion();
    disprove = new Disprove();

    constructor(init?: Partial<Turn>) {
        Object.assign(this, init);
    }

    toString() { // TODO: testing with short description version
        if (!this.playerId
         || !this.suggestion.suspectId
         || !this.suggestion.weaponId
         || !this.suggestion.roomId) {
            return '';
        }

        const player = this.player.name || `Player #${this.playerId}`;

        const suggestionOrDefault = type => this.suggestion[type].name || `${type}  #${this.suggestion[type + 'Id']}`;

        const suspect = suggestionOrDefault('suspect');
        const weapon = suggestionOrDefault('weapon');
        const room = suggestionOrDefault('room');

        let disproved = '';

        if (this.disprove.playerId) {
            const disprovedBy = this.disprove.player.name || `player #${this.disprove.playerId}`;
            const card = this.disprove.card.name || `card #${this.disprove.cardId}`;

            // disproved = ` but was disproved by ${disprovedBy} with ${card}`;
            disproved = ` ! => ${disprovedBy} -> ${card}`;
        }

        // return `${player} suggested ${suspect} with the ${weapon} at ${room}${disproved}`;
        return `${player} ? -> { ${suspect} + ${weapon} @ ${room} }${disproved}`;
    }
}
