import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MdSelectChange } from '@angular/material';

import { Player } from '../player';
import { Suspect } from '../../card/suspect/suspect';
import { Room } from '../../card/room/room';
import { Weapon } from '../../card/weapon/weapon';

@Component({
  selector: 'clue-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  saved: boolean;
  @Input() characters: Suspect[];
  @Input() maxCards: number;
  @Input() player: Player;
  @Input() rooms: Room[];
  @Input() suspects: Suspect[];
  @Input() weapons: Weapon[];
  @Output() private change: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() private remove: EventEmitter<Player> = new EventEmitter<Player>();

  constructor(private formBuilder: FormBuilder) {
      //
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.saved = true;

    if (valueChanged('maxCards')
     || valueChanged('players')) {
      this.form.controls.cardIds.setValidators(Validators.maxLength(this.maxCards));
      this.form.controls.cardIds.updateValueAndValidity();
    }

    function valueChanged(property: string): boolean {
      const input = changes[property];
      return input
          && !input.isFirstChange()
          && input.currentValue !== input.previousValue;
    }
  }
  
  onSelect(event: MdSelectChange) {
    this.change.emit(this.player);
  }

  removePlayer(): void {
    this.remove.emit(this.player);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      id: this.player.id,
      name: [this.player.name, Validators.required],
      order: [this.player.order, Validators.compose([Validators.min(1), Validators.max(6)])],
      characterId: [this.player.characterId, Validators.required],
      cardIds: [this.player.cardIds, Validators.maxLength(this.maxCards)]
    });
    this.listenForChanges();
  }

  private listenForChanges() {
    this.form.valueChanges
        .distinctUntilChanged()
        .do(values => this.saved = false)
        .debounceTime(300)
        // .filter((player) => form.valid)
        .subscribe(player => this.change.emit(player));
  }

}
