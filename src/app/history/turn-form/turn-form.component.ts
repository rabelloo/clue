import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ClueValidators } from '../../shared/validators/validators';
import { Player } from '../../player/player';
import { Room } from '../../card/room/room';
import { Suspect } from '../../card/suspect/suspect';
import { Turn } from './turn';
import { Weapon } from '../../card/weapon/weapon';
import { distinctUntilChanged, tap, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'clue-turn-form',
  templateUrl: './turn-form.component.html',
  styleUrls: ['./turn-form.component.scss']
})
export class TurnFormComponent implements OnInit, OnChanges {

  @Input() players: Player[];
  @Input() rooms: Room[];
  @Input() suspects: Suspect[];
  @Input() turn: Turn;
  @Input() weapons: Weapon[];
  @Output() save = new EventEmitter<Turn>();
  @Output() remove = new EventEmitter<Turn>();
  form: FormGroup; 
  saved = new BehaviorSubject<boolean>(true);
  

  constructor(private formBuilder: FormBuilder) {
    //
  }

  ngOnChanges() {
    this.saved.next(true);
  }

  ngOnInit() {
    const playerIds = this.players.map(p => p.id);

    this.form = this.formBuilder.group({
      id: this.turn.id,
      round: this.turn.round,
      order: [this.turn.order, ClueValidators.range(1, playerIds.length)],
      playerId: [this.turn.playerId, ClueValidators.in(playerIds)]
    });

    this.listenForChanges();
  }

  private listenForChanges(): void {
    this.form.valueChanges
          .pipe(
            distinctUntilChanged(),
            tap(values => this.saved.next(false)),
            debounceTime(300),
            filter(c => false), // TODO: fix this never ending loop
            // filter((turn) => form.valid),
          )
          .subscribe(turn => this.save.emit(turn));
  }

}
