import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AddPlayer, DeletePlayer, SavePlayer } from '../store/player.actions';
import { cardCountSelector, roomsSelector, suspectsSelector, weaponsSelector } from '../../card/store/card.selectors';
import { ClueState } from '../../core/store/state';
import { Player } from '.././player';
import { playersSelector } from '../store/player.selectors';
import { Room } from '../../card/room/room';
import { Suspect } from '../../card/suspect/suspect';
import { Weapon } from '../../card/weapon/weapon';

@Component({
  selector: 'clue-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit {

  cardCount: Observable<number>;
  players: Observable<Player[]>;
  private rooms: Observable<Room[]>;
  private suspects: Observable<Suspect[]>;
  private weapons: Observable<Weapon[]>;

  get maxCards(): Observable<number> {
    return this.cardCount
              .withLatestFrom(this.playerCount)
              .map(([cardCount, playerCount]) => (cardCount - 3) / (playerCount < 3 ? 3 : playerCount));
  }

  get playerCount(): Observable<number> {
    return this.players
              .map(p => p.length);
  }

  constructor(private store: Store<ClueState>) {
    this.cardCount = this.store.select(cardCountSelector);
    this.players = this.store.select(playersSelector);
    this.rooms = this.store.select(roomsSelector);
    this.suspects = this.store.select(suspectsSelector);
    this.weapons = this.store.select(weaponsSelector);
  }

  ngOnInit(): void {
    //
  }

  addPlayer(): void {
    this.store.dispatch(new AddPlayer());
  }

  onSave(player: Player): void {
    this.store.dispatch(new SavePlayer(player));
  }

  onRemove(player: Player): void {
    this.store.dispatch(new DeletePlayer(player));
  }

  charactersFor(player: Player): Observable<Suspect[]> {
    return  this.suspects
              .withLatestFrom(this.otherPlayersCharacterIds(player))
              .map(([suspects, characterIds]) => suspects.filter(s => !characterIds.includes(s.id)));             
  }

  roomsFor(player: Player): Observable<Room[]> {
    return this.validFor(this.rooms, player);
  }

  suspectsFor(player: Player): Observable<Suspect[]> {
    return this.validFor(this.suspects, player);
  }

  weaponsFor(player: Player): Observable<Weapon[]> {
    return this.validFor(this.weapons, player);
  }

  private validFor<T>(cards: Observable<T[]>, player: Player): Observable<T[]> {
    return cards
            // .withLatestFrom(this.otherPlayersCardIds(player))
            // .map(([cards, cardIds]) => cards.filter(c => !cardIds.includes(c.id)));
  }

  private otherPlayers(player: Player): Observable<Player[]> {
    return this.players
            .map(p => p.filter(p => p.id !== player.id));
  }

  private otherPlayersCardIds(player: Player): Observable<number[]> {
    return this.otherPlayers(player)
            .flatMap(p => p)
            .map(p => p.cardIds || []);
  }

  private otherPlayersCharacterIds(player: Player): Observable<number[]> {
    return this.otherPlayers(player)
            .map(p => p.map(p => p.characterId));
  }

}
