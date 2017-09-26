import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AddPlayer, DeletePlayer, SavePlayer } from '../store/player.actions';
import { Card, CardType } from '../../card/card';
import { ClueState } from '../../core/store/state';
import { Player } from '.././player';
import { Suspect } from '../../card/suspect/suspect';
import { Room } from '../../card/room/room';
import { Weapon } from '../../card/weapon/weapon';

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

  get maxCards(): Observable<number> {
    return Observable.forkJoin(this.cards, this.players)
                     .map(([c, p]) => [c.length, p.length])
                     .map(([cardCount, playerCount]) => (cardCount - 3) / (playerCount < 3 ? 3 : playerCount));
  }

  constructor(private store: Store<ClueState>) {
      this.cards = this.store.select(s => s.cards)
                             .map(cm => Object.values(cm));
  }

  ngOnInit(): void {
    //
  }

  addPlayer(): void {
    this.store.dispatch(new AddPlayer());
  }

  onChange(player: Player): void {
    this.store.dispatch(new SavePlayer(player));
  }

  onRemove(player: Player): void {
    this.store.dispatch(new DeletePlayer(player));
  }
  
  charactersFor(player: Player): Observable<Suspect[]> {
    return this.cardsOf(CardType.suspect)
              .withLatestFrom(this.otherPlayersCharacterIds(player))
              .filter(([card, characterIds]) => !characterIds.includes(card.id))
              .zip();
  }
  
  roomsFor(player: Player): Observable<Room[]> {
    const cards = this.cardsOf(CardType.room);
    return this.validFor(cards, player);
  }

  suspectsFor(player: Player): Observable<Suspect[]> {
    const cards = this.cardsOf(CardType.suspect);
    return this.validFor(cards, player);
  }

  weaponsFor(player: Player): Observable<Weapon[]> {
    const cards = this.cardsOf(CardType.weapon);
    return this.validFor(cards, player);
  }

  private cardsOf(cardType: CardType): Observable<Card> {
    return this.cards
              .flatMap(c => c)
              .filter(c => c.type === cardType);
  }

  private validFor<T>(cards: Observable<Card>, player: Player): Observable<T[]> {
    return cards
            .withLatestFrom(this.otherPlayersCardIds(player))
            .filter(([card, cardIds]) => !cardIds.includes(card.id))
            .zip();
  }
  
  private otherPlayers(player: Player): Observable<Player> {
    return this.players
            .flatMap(p => p)
            .filter(p => p.id !== player.id);
  }

  private otherPlayersCardIds(player: Player): Observable<number[]> {
    return this.otherPlayers(player)
            .map(p => p.cardIds);
  }
  
  private otherPlayersCharacterIds(player: Player): Observable<number[]> {
    return this.otherPlayers(player)
            .map(p => p.characterId)
            .zip();
  }

}
