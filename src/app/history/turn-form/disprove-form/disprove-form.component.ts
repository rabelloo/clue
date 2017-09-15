import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Card } from '../../../card/card';
import { CardCollection } from '../../../card/card-collection';
import { ClueValidators } from '../../../shared/validators/validators';
import { Disprove } from '../../turn/disprove';
import { Player } from '../../../player/player';
import { TurnFormComponent } from '../turn-form.component';

@Component({
  selector: 'clue-disprove-form',
  templateUrl: './disprove-form.component.html',
  styleUrls: ['./disprove-form.component.scss']
})
export class DisproveFormComponent implements OnInit {

  @Input() private disprove: Disprove
  @Input() private players: Player[]
  private form: FormGroup
  private cards: Card[]
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private turnForm: TurnFormComponent) {
    let cards = route.snapshot.data.cards as CardCollection;
    
    this.cards = [].concat(cards.rooms, cards.suspects, cards.weapons);
  }

  ngOnInit() {
    let playerIds = this.players.map(p => p.id)
    let cardIds = this.cards.map(s => s.id);

    this.form = this.formBuilder.group({
      playerId: [this.disprove.playerId, ClueValidators.in(playerIds)],
      cardId: [this.disprove.cardId, ClueValidators.in(cardIds)],
    });

    this.turnForm.addControl('disprove', this.form);
  }

}
