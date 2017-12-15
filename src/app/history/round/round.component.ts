import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Disprove } from '../turn-form/disprove-form/disprove';
import { Player } from '../../player/player';
import { Room } from '../../card/room/room';
import { Round } from './round';
import { Suggestion } from '../turn-form/suggestion-form/suggestion';
import { Suspect } from '../../card/suspect/suspect';
import { Turn } from '../turn-form/turn';
import { Weapon } from '../../card/weapon/weapon';

@Component({
  selector: 'clue-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() players: number[];
  @Input() rooms: Room[];
  @Input() suspects: Suspect[];
  @Input() turns: Turn[];
  @Input() weapons: Weapon[];
  @Output() add = new EventEmitter<number>();
  @Output() save = new EventEmitter<Turn>();
  @Output() remove = new EventEmitter<Turn>();

  get canAdd() {
    return this.turns.length < this.players.length;
  }

  constructor() { }

  ngOnInit() { }

  descriptionFor(turn: Turn) {
    if (!turn.playerId
     && !turn.player) {
      return '';
    }

    return turn.player.name || `Player #${turn.playerId}`
         + this.getSuggestionDescription(turn.suggestion)
         + this.getDisprovedDescription(turn.disprove);
  }

  ///////////////

  private getDisprovedDescription(disprove: Disprove): string {
    if (!disprove) {
      return '';
    }

    const disprovedBy = disprove.player.name || `player #${disprove.playerId}`;
    const card = disprove.card.name || `card #${disprove.cardId}`;

    // return ` but was disproved by ${disprovedBy} with ${card}`;
    return ` ! => ${disprovedBy} -> ${card}`;
  }

  private getSuggestionDescription(suggestion: Suggestion): string {
    if (!suggestion) {
      return '';
    }

    const suggestionOrDefault = type => suggestion[type].name || `${type} #${suggestion[type + 'Id']}`;
    const suspect = suggestionOrDefault('suspect');
    const weapon = suggestionOrDefault('weapon');
    const room = suggestionOrDefault('room');

    // return ` suggested ${suspect} with the ${weapon} at ${room}`;
    return ` ? -> { ${suspect} + ${weapon} @ ${room} }`;
  }

}
