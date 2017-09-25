import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Card, CardType } from '../../card/card';
import { CardCollection } from '../../card/card-collection';
import { ClueState } from '../../core/store/state';
import { Player } from '.././player';
import { PlayerService } from '.././player.service';
import { SavePlayer, DeletePlayer } from '../store/player.actions';
import { Store } from '@ngrx/store';
import { Suspect } from '../../card/suspect/suspect';
import { Room } from '../../card/room/room';
import { Weapon } from '../../card/weapon/weapon';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'clue-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit {

  forms = {};
  players: Observable<Player[]>;
  private cards: Observable<Card[]>;

  roomsFor(player: Player): Observable<Room[]> {
    return this.cards
            .map(cards => cards.filter(c => c.type === CardType.room));
  }

  suspectsFor(player: Player): Observable<Suspect[]> {
    return this.cards
            .map(cards => cards.filter(c => c.type === CardType.suspect) as Suspect[]);
  }

  weaponsFor(player: Player): Observable<Weapon[]> {
    return this.cards
            .map(cards => cards.filter(c => c.type === CardType.weapon));
  }

  get maxCards(): number {
    return (this.cardCount - 3) / (this.playerCount < 3 ? 3 : this.playerCount);
  }

  private otherPlayersCardIds(player: Player): number[] {
    return this.players
            .filter(p => p.id !== player.id)
            .flatMap(p => (p as Player).cardIds);
  }

  private get playerCount() {
    return this.players.length;
  }

  private get cardCount(): number {
    return this.cards.length;
  }

  constructor(private store: Store<ClueState>,
              route: ActivatedRoute) {
      this.cardCollection = route.snapshot.data.cards as CardCollection;

      this.cards = [].concat(
                      this.cardCollection.rooms,
                      this.cardCollection.suspects,
                      this.cardCollection.weapons);
  }

  ngOnInit(): void {
    //
  }

  addPlayer(): void {
    this.store.dispatch(new SavePlayer({ name: '', order: this.players.length + 1 }));
  }

  onChange(player: Player): void {
    console.log(`Change notified for ${player.name}`);
    // const index = this.players.findIndex(p => p.id === player.id);
    // this.players[index] = player;
  }

  onRemove(player: Player): void {
    this.store.dispatch(new DeletePlayer(player));
  }

}
