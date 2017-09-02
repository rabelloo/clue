import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Player } from './player';
import { PlayerService } from './player.service';
import { Suspect } from "../card/suspect/suspect";
import { SuspectService } from "../card/suspect/suspect.service";
import { Room } from "../card/room/room";
import { RoomService } from "../card/room/room.service";
import { Weapon } from "../card/weapon/weapon";
import { WeaponService } from "../card/weapon/weapon.service";

@Component({
  selector: 'clue-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  
  form: FormGroup;
  players: Observable<Player[]>;
  suspects: Observable<Suspect[]>;
  rooms: Observable<Room[]>;
  weapons: Observable<Weapon[]>;

  constructor(private playerService: PlayerService,
              private suspectService: SuspectService,
              private roomService: RoomService,
              private weaponService: WeaponService,
              private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      character:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPlayers();
    this.loadSuspects();
    this.loadRooms();
    this.loadWeapons();

    this.listenForChanges();
  }

  private loadPlayers(): void {
    this.players = this.playerService.getAll();
  }

  private listenForChanges() {
    this.form.valueChanges
          .debounceTime(300)
          .distinctUntilChanged()
          // .filter((value) => this.form.valid)
          .subscribe(player => this.savePlayer(player));
  }

  savePlayer(player: Player): void {
    this.playerService.save(player);
  }

  private loadSuspects(): void {
    this.suspects = this.suspectService.get();
  }
  
  private loadRooms(): void {
    this.rooms = this.roomService.get();
  }
  
  private loadWeapons(): void {
    this.weapons = this.weaponService.get();
  }
}
