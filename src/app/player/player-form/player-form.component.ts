import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Suspect } from '../../card/suspect/suspect';

@Component({
  selector: 'clue-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  
  form: FormGroup;
  @Input() player: Player;
  @Input() suspects: Suspect[];
  @Output() remove: EventEmitter<Player> = new EventEmitter<Player>();

  constructor(private fb: FormBuilder,
              private playerService: PlayerService) {
      //
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  private createForm() {
    this.form = this.fb.group({
      id: this.player.id,
      name: ['', Validators.required],
      character: ['', Validators.required]
    });
    this.listenForChanges();
  }
  
  private listenForChanges() {
    this.form.valueChanges
        .distinctUntilChanged()
        .debounceTime(300)
        // .filter((player) => form.valid)
        .subscribe(player => this.savePlayer(player));
  }

  private savePlayer(player: Player): void {
    this.playerService.save(player)
        .subscribe(player => this.player = player);
  }

  private removePlayer(): void {
    var message = `Are you sure you want to delete player ${this.player.name || '"Unnamed"'}?`;

    if (confirm(message))
      this.playerService.delete(this.player)
          .subscribe(() => this.remove.emit(this.player));
  }
}
