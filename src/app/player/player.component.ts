import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PlayerService } from './player.service';
import { Player } from './player';

@Component({
  selector: 'clue-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  
  form: FormGroup;
  players: Observable<Player>;
  suspects: Observable<any> = Observable.of([ // TODO: service
    {
      id: 1,
      name: 'White'
    },
    {
      id: 2,
      name: 'Black'
    }
  ]);

  constructor(private playerService: PlayerService, fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      character:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPlayers();
  }

  private loadPlayers(): void {
    this.players = this.playerService.get();
  }

  savePlayer(player: Player): void {
    this.playerService.save(player);
  }

}
