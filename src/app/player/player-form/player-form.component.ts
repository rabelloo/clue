import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, debounceTime, filter, withLatestFrom, map } from 'rxjs/operators';

import { Player } from '../player';
import { Suspect } from '../../card/suspect/suspect';
import { Room } from '../../card/room/room';
import { Weapon } from '../../card/weapon/weapon';

@Component({
  selector: 'clue-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
  host: {
    '(input-blur)':'onInputBlur($event)',
    '(input-focus)':'onInputFocus($event)'
  },
})
export class PlayerFormComponent implements OnInit, OnChanges {

  @Input() characters: Suspect[];
  @Input() maxCards: number;
  @Input() player: Player;
  @Input() playerCount: number;
  @Input() rooms: Room[];
  @Input() suspects: Suspect[];
  @Input() weapons: Weapon[];
  @Output() private save: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() private remove: EventEmitter<Player> = new EventEmitter<Player>();
  form: FormGroup;
  saved = new BehaviorSubject<boolean>(true);
  private hasFocusedInput = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: FormBuilder) {
    //
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.saved.next(true);

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
  
  onInputBlur() {
    this.hasFocusedInput.next(false);
  }
  
  onInputFocus() {
    this.hasFocusedInput.next(true);
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
        .pipe(
          distinctUntilChanged(),
        )
        .subscribe(() => this.saved.next(false)),

    this.hasFocusedInput
        .pipe(
          debounceTime(1), // prevents trigger when tabbing between inputs
          distinctUntilChanged(),
          filter(hasFocus => !hasFocus),
          withLatestFrom(this.form.valueChanges),
          map(([h, p]) => p),
          distinctUntilChanged(),
        )
        .subscribe(player => this.save.emit(player));
  }

}
