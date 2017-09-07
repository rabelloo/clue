import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CardCollection } from '../../card/card-collection';
import { Notifier } from '../../core/notifier/notifier.service';
import { Player } from '../../player/player';
import { Room } from '../../card/room/room';
import { Suspect } from '../../card/suspect/suspect';
import { Turn } from './turn';
import { TurnService } from './turn.service';
import { Weapon } from '../../card/weapon/weapon';
import { ClueValidators } from "../../shared/validators/validators";
import { Card } from "../../card/card";

@Component({
  selector: 'clue-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class TurnComponent implements OnInit {

  @Input() private turn: Turn
  @Input() private players: Player[]
  @Output() private remove = new EventEmitter<Turn>()
  private saved: boolean
  private form: FormGroup
  private rooms: Room[]
  private suspects: Suspect[]
  private weapons: Weapon[]
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private turnService: TurnService,
              private notifier: Notifier) {
    var cards = route.snapshot.data.cards as CardCollection;
    
    this.rooms = cards.rooms;
    this.suspects = cards.suspects;
    this.weapons = cards.weapons;  
  }

  ngOnInit() {
    var playerIds = this.players.map(p => p.id);
    var cardIds = new Array<Card>()
                    .concat(this.rooms, this.suspects, this.weapons)
                    .map(c => c.id);

    this.form = this.formBuilder.group({
      id: this.turn.id,
      order: [this.turn.order, ClueValidators.range(1, this.players.length)],
      playerId: [this.turn.playerId, ClueValidators.in(playerIds)],
      suggestion: this.formBuilder.group({
        suspectId: [this.turn.suggestion.suspectId, ClueValidators.in(cardIds)],
        weaponId: [this.turn.suggestion.weaponId, ClueValidators.in(cardIds)],
        roomId: [this.turn.suggestion.roomId, ClueValidators.in(cardIds)],
      }),
      disprove: this.formBuilder.group({
        playerId: [this.turn.disprove.playerId, ClueValidators.in(playerIds)],
        cardId: [this.turn.disprove.cardId, ClueValidators.in(cardIds)],
      })
    });

    this.listenForChanges();
  }

  private saveTurn(turn: Turn): void {
    this.turnService.save(turn)
        .subscribe(turn => {
          this.saved = true;
          this.turn = turn;
        });
  }

  private listenForChanges(): void {
    this.form.valueChanges
          .do(values => this.saved = false)
          .distinctUntilChanged()
          .debounceTime(300)
          // .filter((turn) => form.valid)
          .subscribe(turn => this.saveTurn(turn));
  }

  private removeTurn(): void {
    var player = this.turn.player.name || `Player #${this.turn.playerId}`;
    var message = `Are you sure you want to delete ${player}'s turn in round ${this.turn.round}?`;

    if (this.notifier.confirm(message))
      this.turnService.delete(this.turn)
          .subscribe(() => this.remove.emit(this.turn));
  }

}
