import { Disprove } from './disprove';
import { Suggestion } from './suggestion';
import { Player } from '../../player/player';

export class Turn {
    id: number
    round: number = 1
    order: number = 1
    
    playerId: number
    player = new Player()

    suggestion = new Suggestion()
    disprove = new Disprove()
    
    constructor(init?: Partial<Turn>) {
        Object.assign(this, init);
    }

    toString() {
        if (!this.playerId
         || !this.suggestion.suspectId
         || !this.suggestion.weaponId
         || !this.suggestion.roomId)
            return '';

        var player = this.player.name || `Player #${this.playerId}`;

        var suggestionOrDefault = type => this.suggestion[type] || `${type}  #${this.suggestion[type + 'Id']}`;

        var suspect = suggestionOrDefault('suspect');
        var weapon = suggestionOrDefault('weapon');
        var room = suggestionOrDefault('room');

        var disproved = '';
        
        if (this.disprove.playerId) {
            var disprovedBy = this.disprove.player.name || `player #${this.disprove.playerId}`;
            var card = this.disprove.card.name || `card #${this.disprove.cardId}`

            disproved = ` but was disproved by ${disprovedBy} with ${card}`;
        }

        return `${player} suggested ${suspect} with the ${weapon} at ${room}${disproved}`;
    }
}