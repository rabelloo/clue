import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardCollection } from '../card/card-collection';
import { HistoryService } from './history.service';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player';
import { Room } from '../card/room/room';
import { Round } from './round/round';
import { Suspect } from '../card/suspect/suspect';
import { Turn } from './turn/turn';
import { Weapon } from '../card/weapon/weapon';

@Component({
  selector: 'clue-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  rounds: Round[];
  players: Player[];
  private rooms: Room[];
  private suspects: Suspect[];
  private weapons: Weapon[];

  get cardCount(): number {
    return this.rooms.length + this.suspects.length + this.weapons.length;
  }

  get ready(): boolean {
    return this.players.flatMap((p: Player) => p.cardIds).length === this.cardCount;
  }

  constructor(private historyService: HistoryService,
              private playerService: PlayerService,
              private route: ActivatedRoute) {
    this.players = route.snapshot.data.players as Player[];

    const cards = route.snapshot.data.cards as CardCollection;

    this.rooms = cards.rooms;
    this.suspects = cards.suspects;
    this.weapons = cards.weapons;
  }

  ngOnInit() {
    this.loadRounds();
  }

  addTurn() {
    this.historyService.addTurn(this.getCurrentRound(), this.players)
        .subscribe(this.appendTurn);
  }

  onRemove(round: Round): void {
    this.rounds = this.rounds.filter(r => r.number !== round.number);
  }

  private appendTurn = (turn: Turn) => {
    const round = this.rounds.find(r => r.number === turn.round);

    if (round) {
      round.turns.push(turn);
    }
    else {
      this.rounds.push(
        new Round({
          number: turn.round,
          turns: [turn]
        })
      );
    }
  }

  private getCurrentRound(): Round {
    if (!this.rounds.length) {
      return new Round();
    }

    return this.rounds[this.rounds.length - 1];
  }

  private loadRounds(): void {
    this.historyService.getRounds(this.players, this.suspects, this.weapons, this.rooms)
        .defaultIfEmpty([])
        .subscribe(rounds => this.rounds = this.rounds.concat(rounds));
  }

}
