import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Notifier } from '../../core/notifier/notifier.service';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Suspect } from '../../card/suspect/suspect';
import { Room } from '../../card/room/room';
import { Weapon } from '../../card/weapon/weapon';

@Component({
  selector: 'clue-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  saved: boolean;
  character: Suspect;
  @Input() player: Player;
  @Input() playerCount = 0;
  @Input() rooms: Room[] = [];
  @Input() suspects: Suspect[] = [];
  @Input() weapons: Weapon[] = [];
  @Output() private remove: EventEmitter<Player> = new EventEmitter<Player>();

  private get cardCount(): number {
    return this.rooms.length + this.suspects.length + this.weapons.length;
  }

  get maxCards(): number {
    return (this.cardCount - 3) / (this.playerCount < 3 ? 3 : this.playerCount);
  }

  constructor(private formBuilder: FormBuilder,
              private notifier: Notifier,
              private playerService: PlayerService) {
      //
  }

  ngOnInit(): void {
    this.createForm();
    this.character = this.suspectFor(this.player.characterId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.playerCount.isFirstChange()) {
      return;
    }

    if (changes.playerCount.currentValue !== changes.playerCount.previousValue) {
      this.form.controls.cardIds.setValidators(Validators.maxLength(this.maxCards));
      this.form.controls.cardIds.updateValueAndValidity();
    }
  }

  onSelect(event: {value: number}): void {
    this.character = this.suspectFor(event.value);
  }

  removePlayer(): void {
    const message = `Are you sure you want to delete player ${this.player.name || '"Unnamed"'}?`;

    if (this.notifier.confirm(message)) {
      this.playerService.delete(this.player)
          .subscribe(() => this.remove.emit(this.player));
    }
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
        .do(values => this.saved = false)
        .distinctUntilChanged()
        .debounceTime(300)
        // .filter((player) => form.valid)
        .subscribe(player => this.savePlayer(player));
  }

  private savePlayer(player: Player): void {
    this.playerService.save(player)
        .subscribe(player => {
          this.saved = true;
          this.player = player;
        });
  }

  private suspectFor(id: number): Suspect {
    return this.suspects.find(s => s.id === id) || new Suspect();
  }

}
