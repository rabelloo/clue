import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CardCollection } from '../../../card/card-collection';
import { ClueValidators } from '../../../shared/validators/validators';
import { Room } from '../../../card/room/room';
import { Suggestion } from '../../turn/suggestion';
import { Suspect } from '../../../card/suspect/suspect';
import { TurnFormComponent } from '../turn-form.component';
import { Weapon } from '../../../card/weapon/weapon';

@Component({
  selector: 'clue-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.scss']
})
export class SuggestionFormComponent implements OnInit {

  @Input() suggestion: Suggestion;
  form: FormGroup;
  rooms: Room[];
  suspects: Suspect[];
  weapons: Weapon[];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private turnForm: TurnFormComponent) {
    const cards = route.snapshot.data.cards as CardCollection;

    this.rooms = cards.rooms;
    this.suspects = cards.suspects;
    this.weapons = cards.weapons;
  }

  ngOnInit() {
    const suspectIds = this.suspects.map(s => s.id);
    const weaponIds = this.weapons.map(w => w.id);
    const roomIds = this.rooms.map(r => r.id);

    this.form = this.formBuilder.group({
      suspectId: [this.suggestion.suspectId, ClueValidators.in(suspectIds)],
      weaponId: [this.suggestion.weaponId, ClueValidators.in(weaponIds)],
      roomId: [this.suggestion.roomId, ClueValidators.in(roomIds)],
    });

    this.turnForm.addControl('suggestion', this.form);
  }

}
