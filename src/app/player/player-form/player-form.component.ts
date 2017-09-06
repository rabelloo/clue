import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
export class PlayerFormComponent implements OnInit {

  form: FormGroup;
  saved: boolean;
  @Input() player: Player;
  @Input() playerCount: number = 0;
  @Input() suspects: Suspect[] = [];
  @Input() rooms: Room[] = [];
  @Input() weapons: Weapon[] = [];
  @Output() remove: EventEmitter<Player> = new EventEmitter<Player>();

  private get cardCount(): number {
    return this.suspects.length + this.rooms.length + this.weapons.length;
  }

  private get maxCards(): number {
    return (this.cardCount - 3) / (this.playerCount < 3 ? 3 : this.playerCount);
  }

  constructor(private fb: FormBuilder,
              private notifier: Notifier,
              private playerService: PlayerService) {
      //
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  private createForm() {
    this.form = this.fb.group({
      id: this.player.id,
      name: [this.player.name, Validators.required],
      character: [this.player.character, Validators.required],
      cards: [this.player.cards, Validators.maxLength(this.maxCards)]
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

  private removePlayer(): void {
    var message = `Are you sure you want to delete player ${this.player.name || '"Unnamed"'}?`;

    if (this.notifier.confirm(message))
      this.playerService.delete(this.player)
          .subscribe(() => this.remove.emit(this.player));
  }
}
