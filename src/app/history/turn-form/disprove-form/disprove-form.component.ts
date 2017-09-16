import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Card } from '../../../card/card';
import { CardCollection } from '../../../card/card-collection';
import { ClueValidators } from '../../../shared/validators/validators';
import { Disprove } from '../../turn/disprove';
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
    const playerIds = this.players.map(p => p.id);
    const cardIds = [].concat(this.rooms, this.suspects, this.weapons)
                      .map(s => s.id);

    this.form = this.formBuilder.group({
      playerId: [this.disprove.playerId, ClueValidators.in(playerIds)],
      cardId: [this.disprove.cardId, ClueValidators.in(cardIds)],
    });

    this.turnForm.addControl('disprove', this.form);
  }

}
