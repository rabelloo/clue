import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HistoryService } from '../history.service';
import { Player } from '../../player/player';
import { Round } from './round';
import { Turn } from '../turn/turn';

@Component({
  selector: 'clue-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() round: Round;
  @Input() players: Player[];
  @Output() change = new EventEmitter<Round>();
  @Output() remove = new EventEmitter<Round>();

  get canAdd() {
    return this.round.turns.length < this.players.length;
  }

  constructor() { }

  ngOnInit() { }

  addTurn(): void {
    this.change.emit(this.round);
  }
  
  descriptionFor(turn: Turn) {
    if (!turn.playerId
     || !turn.suggestion.suspectId
     || !turn.suggestion.weaponId
     || !turn.suggestion.roomId) {
          return '';
      }

      const player = turn.player.name || `Player #${turn.playerId}`;

      const suggestionOrDefault = type => turn.suggestion[type].name || `${type}  #${turn.suggestion[type + 'Id']}`;

      const suspect = suggestionOrDefault('suspect');
      const weapon = suggestionOrDefault('weapon');
      const room = suggestionOrDefault('room');

      let disproved = '';

      if (turn.disprove.playerId) {
          const disprovedBy = turn.disprove.player.name || `player #${turn.disprove.playerId}`;
          const card = turn.disprove.card.name || `card #${turn.disprove.cardId}`;

          // disproved = ` but was disproved by ${disprovedBy} with ${card}`;
          disproved = ` ! => ${disprovedBy} -> ${card}`;
      }

      // return `${player} suggested ${suspect} with the ${weapon} at ${room}${disproved}`;
      return `${player} ? -> { ${suspect} + ${weapon} @ ${room} }${disproved}`;
  }

  onRemove(turn: Turn): void {
    this.round.turns = this.round.turns.filter(t => t.id !== turn.id);

    if (!this.round.turns.length) {
      this.remove.emit(this.round);
    }
  }

}
