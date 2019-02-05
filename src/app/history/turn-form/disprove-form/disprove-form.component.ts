import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Room } from '../../../card/room/room';
import { Suspect } from '../../../card/suspect/suspect';
import { Weapon } from '../../../card/weapon/weapon';
import { Player } from '../../../player/player';
import { ClueValidators } from '../../../validators/validators';
import { TurnFormComponent } from '../turn-form.component';
import { Disprove } from './disprove';

@Component({
  selector: 'clue-disprove-form',
  templateUrl: './disprove-form.component.html',
  styleUrls: ['./disprove-form.component.scss'],
})
export class DisproveFormComponent implements OnInit {
  @Input() disprove: Disprove;
  @Input() players: Player[];
  @Input() room: Room;
  @Input() suspect: Suspect;
  @Input() weapon: Weapon;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turnForm: TurnFormComponent
  ) {}

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
