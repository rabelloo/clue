import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MdSelectChange } from '@angular/material';

import { CardCollection } from '../../card/card-collection';
import { Player } from '../player';
import { PlayerService } from '../player.service';
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
  @Input() cards: CardCollection;
  @Input() maxCards: number;
  @Input() player: Player;
  @Output() private change: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() private remove: EventEmitter<Player> = new EventEmitter<Player>();

  get rooms() {
    return this.cards.rooms;
  }

  get suspects() {
    return this.cards.suspects;
  }

  get weapons() {
    return this.cards.weapons;
  }

  constructor(private formBuilder: FormBuilder,
              private playerService: PlayerService) {
      //
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.players || changes.players.isFirstChange()) {
      return;
    }

    if (changes.players.currentValue !== changes.players.previousValue) {
      this.form.controls.cardIds.setValidators(Validators.maxLength(this.maxCards));
      this.form.controls.cardIds.updateValueAndValidity();
    }
  }
  
  onSelect(event: MdSelectChange) {
    console.log(`Selecting ${event} for ${this.player.name}`);
    this.change.emit(this.player);
  }

  removePlayer(): void {
    this.playerService.delete(this.player)
        .subscribe(() => this.remove.emit(this.player));
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
          player.character = this.player.character;
          this.player = player;
        });
  }

}
