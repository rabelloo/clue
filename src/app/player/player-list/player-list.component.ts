import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardCollection } from '../../card/card-collection';
import { Player } from '.././player';
import { PlayerService } from '.././player.service';
import { Suspect } from '../../card/suspect/suspect';
import { Room } from '../../card/room/room';
import { Weapon } from '../../card/weapon/weapon';

@Component({
  selector: 'clue-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  forms = {};
  players: Player[] = [];
  rooms: Room[];
  suspects: Suspect[];
  weapons: Weapon[];

  constructor(private playerService: PlayerService,
              route: ActivatedRoute) {
      const cards = route.snapshot.data.cards as CardCollection;

      this.rooms = cards.rooms;
      this.suspects = cards.suspects;
      this.weapons = cards.weapons;
  }

  ngOnInit(): void {
    this.loadPlayers();
  }

  addPlayer(): void {
    this.playerService.save(new Player({ order: this.players.length + 1 }))
        .subscribe(player => this.players.push(player));
  }

  onRemove(player: Player): void {
    this.players = this.players.filter(p => p.id !== player.id);
  }

  private loadPlayers(): void {
    this.playerService.getAll()
        .subscribe(players => this.players = players);
  }
}
