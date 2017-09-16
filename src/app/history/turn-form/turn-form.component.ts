import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { CardCollection } from '../../card/card-collection';
import { Notifier } from '../../core/notifier/notifier.service';
import { Player } from '../../player/player';
import { Room } from '../../card/room/room';
import { Suspect } from '../../card/suspect/suspect';
import { Turn } from '../turn/turn';
import { TurnService } from '../turn/turn.service';
import { Weapon } from '../../card/weapon/weapon';
import { ClueValidators } from '../../shared/validators/validators';
import { Card } from '../../card/card';

@Component({
  selector: 'clue-turn-form',
  templateUrl: './turn-form.component.html',
  styleUrls: ['./turn-form.component.scss']
})
export class TurnFormComponent implements OnInit {

  @Input() turn: Turn;
  @Input() players: Player[];
  @Output() remove = new EventEmitter<Turn>();
  saved: boolean;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private turnService: TurnService,
              private notifier: Notifier) {
    //
  }

  ngOnInit() {
    const playerIds = this.players.map(p => p.id);

    this.form = this.formBuilder.group({
      id: this.turn.id,
      order: [this.turn.order, ClueValidators.range(1, this.players.length)],
      playerId: [this.turn.playerId, ClueValidators.in(playerIds)]
    });

    this.listenForChanges();
  }

  addControl(name: string, control: AbstractControl): void {
    this.form.addControl(name, control);
  }

  removeTurn(): void {
    const player = this.turn.player.name || `Player #${this.turn.playerId}`;
    const message = `Are you sure you want to delete ${player}'s turn in round ${this.turn.round}?`;

    if (this.notifier.confirm(message)) {
      this.turnService.delete(this.turn)
          .subscribe(() => this.remove.emit(this.turn));
    }
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

}
