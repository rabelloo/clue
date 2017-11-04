import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AddPlayer, DeletePlayer, SavePlayer } from '../store/player.actions';
import { CardSelectors } from '../../card/store/card.selectors';
import { ClueState } from '../../core/store/state';
import { Player } from '.././player';
import { PlayerSelectors } from '../store/player.selectors';
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

  maxCards: Observable<number>;
  playerCount: Observable<number>;
  players: Observable<Player[]>;
  private maxPlayers = 6;

  get canAdd(): Observable<boolean> {
    return this.playerCount
              .pipe(
                map(p => p < this.maxPlayers)
              );
  }

  constructor(private store: Store<ClueState>) {
    this.maxCards = this.store.select(CardSelectors.max);
    this.playerCount = this.store.select(PlayerSelectors.count);
    this.players = this.store.select(PlayerSelectors.all);
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
    return this.store.select(CardSelectors.validCharactersFor(player));
  }

  roomsFor(player: Player): Observable<Room[]> {
    return this.store.select(CardSelectors.validRoomsFor(player));
  }

  suspectsFor(player: Player): Observable<Suspect[]> {
    return this.store.select(CardSelectors.validSuspectsFor(player));
  }

  weaponsFor(player: Player): Observable<Weapon[]> {
    return this.store.select(CardSelectors.validWeaponsFor(player));
  }

}
