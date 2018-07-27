import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ClueValidators } from '../../../validators/validators';
import { Room } from '../../../card/room/room';
import { Suggestion } from './suggestion';
import { Suspect } from '../../../card/suspect/suspect';
import { TurnFormComponent } from '../turn-form.component';
import { Weapon } from '../../../card/weapon/weapon';

@Component({
  selector: 'clue-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent implements OnInit {

  @Input() rooms: Room[];
  @Input() suggestion: Suggestion;
  @Input() suspects: Suspect[];
  @Input() weapons: Weapon[];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private turnForm: TurnFormComponent) { }

  ngOnInit() {
    const suspectIds = this.suspects.map(s => s.id);
    const weaponIds = this.weapons.map(w => w.id);
    const roomIds = this.rooms.map(r => r.id);

    const suggestion = this.suggestion || {} as Suggestion;

    this.form = this.formBuilder.group({
      suspectId: [suggestion.suspectId, ClueValidators.in(suspectIds)],
      weaponId: [suggestion.weaponId, ClueValidators.in(weaponIds)],
      roomId: [suggestion.roomId, ClueValidators.in(roomIds)],
    });

    this.turnForm.form.addControl('suggestion', this.form);
  }

}
