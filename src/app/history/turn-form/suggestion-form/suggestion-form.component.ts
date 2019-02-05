import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Room } from '../../../card/room/room';
import { Suspect } from '../../../card/suspect/suspect';
import { Weapon } from '../../../card/weapon/weapon';
import { ClueValidators } from '../../../validators/validators';
import { TurnFormComponent } from '../turn-form.component';
import { Suggestion } from './suggestion';

@Component({
  selector: 'clue-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss'],
})
export class SuggestionFormComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() suggestion: Suggestion;
  @Input() suspects: Suspect[];
  @Input() weapons: Weapon[];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turnForm: TurnFormComponent
  ) {}

  ngOnInit() {
    const suspectIds = this.suspects.map(s => s.id);
    const weaponIds = this.weapons.map(w => w.id);
    const roomIds = this.rooms.map(r => r.id);

    const suggestion = this.suggestion || ({} as Suggestion);

    this.form = this.formBuilder.group({
      suspectId: [suggestion.suspectId, ClueValidators.in(suspectIds)],
      weaponId: [suggestion.weaponId, ClueValidators.in(weaponIds)],
      roomId: [suggestion.roomId, ClueValidators.in(roomIds)],
    });

    this.turnForm.form.addControl('suggestion', this.form);
  }
}
