import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ClueValidators } from '../../../shared/validators/validators';
import { Disprove } from './disprove';
import { Player } from '../../../player/player';
import { Room } from '../../../card/room/room';
import { Suspect } from '../../../card/suspect/suspect';
import { TurnFormComponent } from '../turn-form.component';
import { Weapon } from '../../../card/weapon/weapon';

@Component({
  selector: 'clue-disprove-form',
  templateUrl: './disprove-form.component.html',
  styleUrls: ['./disprove-form.component.scss']
})
export class DisproveFormComponent implements OnInit {

  @Input() disprove: Disprove;
  @Input() players: Player[];
  @Input() room: Room;
  @Input() suspect: Suspect;
  @Input() weapon: Weapon;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private turnForm: TurnFormComponent) {
    //
  }

  ngOnInit() {
    const playerIds = this.players.map(p => p.id);
    const cardIds = [this.room, this.suspect, this.weapon]
                      .filter(c => c)
                      .map(c => c && c.id);

    this.form = this.formBuilder.group({
      playerId: [this.disprove.playerId, ClueValidators.in(playerIds)],
      cardId: [this.disprove.cardId, ClueValidators.in(cardIds)],
    });

    this.turnForm.form.addControl('disprove', this.form);
  }

}
