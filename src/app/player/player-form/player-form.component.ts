import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Room } from '../../card/room/room';
import { Suspect } from '../../card/suspect/suspect';
import { Weapon } from '../../card/weapon/weapon';
import { ClueValidators } from '../../validators/validators';
import { Player } from '../player';

@Component({
  selector: 'clue-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerFormComponent implements OnInit, OnChanges {
  @Input() characters: Suspect[];
  @Input() maxCards: number;
  @Input() player: Player;
  @Input() playerCount: number;
  @Input() rooms: Room[];
  @Input() suspects: Suspect[];
  @Input() weapons: Weapon[];
  @Output() save: Subject<Player>;
  @Output() remove = new Subject<Player>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      id: null,
      name: [null, Validators.required],
      order: [null, ClueValidators.range(1, 6)],
      characterId: [null, Validators.required],
      cardIds: [null, Validators.maxLength(6)],
    });

    this.save = this.form.valueChanges as Subject<Player>;
  }

  ngOnInit(): void {
    this.form.patchValue(this.player);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (propChanged('maxCards') || propChanged('playerCount')) {
      this.form.controls.cardIds.setValidators(
        Validators.maxLength(this.maxCards)
      );
      this.form.controls.cardIds.updateValueAndValidity();
    }

    function propChanged<K extends keyof PlayerFormComponent>(prop: K) {
      return didPropertyChange(changes, prop);
    }
  }

  deletePlayer(): void {
    this.remove.next(this.player);
  }
}

function didPropertyChange<K extends keyof PlayerFormComponent>(
  changes: SimpleChanges,
  property: K
): boolean {
  const input = changes[property];

  return (
    input &&
    !input.isFirstChange() &&
    input.currentValue !== input.previousValue
  );
}
