import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Card } from '../../../card/card';
import { CardCollection } from '../../../card/card-collection';
import { ClueValidators } from '../../../shared/validators/validators';
import { Disprove } from '../../turn/disprove';
import { Player } from '../../../player/player';
import { Room } from '../../../card/room/room';
import { Suggestion } from '../../turn/suggestion';
import { Suspect } from '../../../card/suspect/suspect';
import { TurnFormComponent } from '../turn-form.component';
import { Weapon } from '../../../card/weapon/weapon';
import { Turn } from '../../turn/turn';

@Component({
  selector: 'clue-disprove-form',
  templateUrl: './disprove-form.component.html',
  styleUrls: ['./disprove-form.component.scss']
})
export class DisproveFormComponent implements OnInit {

  @Input() turn: Turn;
  @Input() players: Player[];
  form: FormGroup;
  private rooms: Room[];
  private suspects: Suspect[];
  private weapons: Weapon[];
  
  get disprove(): Disprove { return this.turn.disprove; }
  
  get suspect(): Suspect {
    return this.suspects.find(s => s.id === this.suggestion.suspectId) || new Suspect();
  }

  get validPlayers(): Player[] {
    return this.players.filter(p => p.id !== this.turn.playerId);
  }

  get validRooms(): Room[] {
    return this.rooms.filter(r => r.id === this.suggestion.roomId);
  }
  
  get validSuspects(): Suspect[] {
    return this.suspects.filter(s => s.id === this.suggestion.suspectId);
  }
  
  get validWeapons(): Weapon[] {
    return this.weapons.filter(w => w.id === this.suggestion.weaponId);
  }

  private get suggestion(): Suggestion { return this.turn.suggestion; }
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private turnForm: TurnFormComponent) {
    const cards = route.snapshot.data.cards as CardCollection;

    this.rooms = cards.rooms;
    this.suspects = cards.suspects;
    this.weapons = cards.weapons;
  }

  ngOnInit() {
    const playerIds = this.validPlayers.map(p => p.id);
    const cardIds = [].concat(this.validRooms, this.validSuspects, this.validWeapons)
                      .map(s => s.id);

    this.form = this.formBuilder.group({
      playerId: [this.disprove.playerId, ClueValidators.in(playerIds)],
      cardId: [this.disprove.cardId, ClueValidators.in(cardIds)],
    });

    this.turnForm.addControl('disprove', this.form);
  }

}
