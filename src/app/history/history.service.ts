import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '../card/card';
import { Disprove } from './turn/disprove';
import { Player } from '../player/player';
import { Room } from '../card/room/room';
import { Round } from './round/round';
import { Suggestion } from './turn/suggestion';
import { Suspect } from '../card/suspect/suspect';
import { Turn } from './turn/turn';
import { TurnService } from './turn/turn.service';
import { Weapon } from '../card/weapon/weapon';

@Injectable()
export class HistoryService {

  constructor(private turnService: TurnService) {
  }

  addTurn(currentRound: Round, players: Player[]): Observable<Turn> {
    return this.saveTurn(this.getNextTurn(currentRound, players));
  }

  saveTurn(turn: Turn): Observable<Turn> {
    return this.turnService.save(turn);
  }

  getRounds(players?: Player[],
            suspects?: Suspect[],
            weapons?: Weapon[],
            rooms?: Room[]
          ): Observable<Round[]> {
    return this.turnService.getAll()
                .flatMap(turns => turns)
                .groupBy(turn => turn.round)
                .flatMap(group =>
                  group.reduce((rounds, turn) => [...rounds, this.turnFor(turn, players, suspects, weapons, rooms)], [])
                       .map(turns => new Round({
                         number: group.key,
                         turns: turns
                        }))
                )
                .zip();
  }

  private getNextTurn(currentRound: Round, players: Player[]): Turn {
    let currentTurn = currentRound.turns.length + 1;
    let nextRound = currentRound.number;
    const playerCount = players.length || 6;

    if (currentTurn > playerCount) {
      ++nextRound;
      currentTurn = 1;
    }

    const nextPlayer = players.find(p => p.order === currentTurn);

    return {
      id: undefined,
      round: nextRound,
      order: currentTurn,
      playerId: nextPlayer.id,
      player: undefined,
      suggestion: undefined,
      disprove: undefined,
    };
  }

  private turnFor = (turn: Turn,
                     players: Player[],
                     suspects: Suspect[],
                     weapons: Weapon[],
                     rooms: Room[]
                    ): Turn =>
    Object.assign({}, turn, {
      disprove: this.disproveFor(turn, players, suspects, weapons, rooms),
      player: this.playerFor(turn, players),
      suggestion: this.suggestionFor(turn, suspects, weapons, rooms)
    })

  private disproveFor = (turn: Turn,
                         players: Player[],
                         suspects: Suspect[],
                         weapons: Weapon[],
                         rooms: Room[]
                        ): Disprove =>
    <Disprove> {
      card: this.disproveCardFor(turn, [].concat(suspects || [], weapons || [], rooms || [])),
      cardId: turn.disprove.cardId,
      player: this.disprovedFor(turn, players),
      playerId: turn.disprove.playerId,
    }

  private disprovedFor = (turn: Turn, players: Player[]) =>
  this.findPlayer(turn.disprove.playerId, players)
    || turn.disprove.player

  private playerFor = (turn: Turn, players: Player[]) =>
    this.findPlayer(turn.playerId, players)
    || turn.player

  private findPlayer = (playerId: number, players: Player[]) =>
    (players || []).find(p => p.id === playerId)

  private suggestionFor = (turn: Turn,
                           suspects: Suspect[],
                           weapons: Weapon[],
                           rooms: Room[]
                          ): Suggestion =>
    <Suggestion> {
      suspect: this.suspectFor(turn, suspects),
      suspectId: turn.suggestion.suspectId,
      weapon: this.weaponFor(turn, weapons),
      weaponId: turn.suggestion.weaponId,
      room: this.roomFor(turn, rooms),
      roomId: turn.suggestion.roomId,
    }

  private suspectFor = (turn: Turn, suspects: Suspect[]): Suspect =>
    this.suggestionCardFor(turn, suspects, 'suspect')

  private weaponFor = (turn: Turn, weapons: Weapon[]): Weapon =>
    this.suggestionCardFor(turn, weapons, 'weapon')

  private roomFor = (turn: Turn, rooms: Room[]): Room =>
    this.suggestionCardFor(turn, rooms, 'room')

  private disproveCardFor = (turn: Turn, cards: Card[]) =>
    this.findCard(turn.disprove.cardId, cards)
    || turn.disprove.card

  private suggestionCardFor = (turn: Turn, cards: Card[], type: string) =>
    this.findCard(turn.suggestion[type + 'Id'], cards)
    || turn.suggestion[type]

  private findCard = (cardId: number, cards: Card[]) =>
    (cards || []).find(c => c.id === cardId)

}
