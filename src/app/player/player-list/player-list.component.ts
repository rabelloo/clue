import { Component, OnInit } from '@angular/core';

import { Player } from '.././player';
import { PlayerService } from '.././player.service';
import { Suspect } from '../../card/suspect/suspect';
import { SuspectService } from '../../card/suspect/suspect.service';
import { Room } from '../../card/room/room';
import { RoomService } from '../../card/room/room.service';
import { Weapon } from '../../card/weapon/weapon';
import { WeaponService } from '../../card/weapon/weapon.service';

@Component({
  selector: 'clue-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  
  forms = {};
  players: Player[] = [];
  suspects: Suspect[];
  rooms: Room[];
  weapons: Weapon[];

  constructor(private playerService: PlayerService,
              private suspectService: SuspectService,
              private roomService: RoomService,
              private weaponService: WeaponService) {
      //
  }

  ngOnInit(): void {
    this.loadPlayers();
    this.loadSuspects();
    this.loadRooms();
    this.loadWeapons();
  }

  private addPlayer(): void {
    this.playerService.save(new Player())
        .subscribe(player => this.players.push(player));
  }

  private loadPlayers(): void {
    this.playerService.getAll()
        .subscribe(players => this.players = players);
  }

  private loadSuspects(): void {
    this.suspectService.get()
        .subscribe(suspects => this.suspects = suspects);
  }
  
  private loadRooms(): void {
    this.roomService.get()
        .subscribe(rooms => this.rooms = rooms);
  }
  
  private loadWeapons(): void {
    this.weaponService.get()
        .subscribe(weapons => this.weapons = weapons);
  }

  private onRemove(player: Player): void {
    this.players = this.players.filter(p => p.id !== player.id);
  }
}
