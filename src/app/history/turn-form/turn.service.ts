import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Disprove } from './disprove-form/disprove';
import { LocalForageIdTable } from '../../core/local-forage/local-forage-id-table';
import { LocalForageService } from '../../core/local-forage/local-forage.service';
import { Notifier } from '../../core/notifier/notifier.service';
import { Suggestion } from './suggestion-form/suggestion';
import { Turn } from './turn';

@Injectable()
export class TurnService {

  private readonly tableName = 'Turns';
  turns: LocalForageIdTable<Turn>;

  constructor(localForageService: LocalForageService,
              private notifier: Notifier) {
    this.turns = localForageService.getIdTable<Turn>(this.tableName);
  }

  getAll(): Observable<Turn[]> {
    return this.turns.getAll();
  }

  save(turn: Turn): Observable<Turn> {
    return this.turns.save(this.getSavableTurn(turn));
  }

  delete(turn: Turn): Observable<boolean> {
    const player = turn.player.name || `Player #${turn.playerId}`;
    const message = `Are you sure you want to delete ${player}'s turn in round ${turn.round}?`;

    if (this.notifier.confirm(message)) {
      return this.turns.delete(turn)
                 .pipe(
                   map(() => true)
                 );
    }

    return of(false);
  }

  private getSavableTurn(turn: Turn): Turn {
    const { disprove, suggestion, player, ...rest } = turn;
    return <Turn>{
      ...rest,
      disprove: this.getSavableDisprove(disprove),
      suggestion: this.getSavableSuggestion(suggestion)
    };
  }

  private getSavableDisprove(disprove: Disprove): Disprove {
    if (!disprove) {
    return;
    }

    const { card, player, ...rest } = disprove;
    return rest;
  }

  private getSavableSuggestion(suggestion: Suggestion): Suggestion {
    if (!suggestion) {
      return;
    }

    const { room, suspect, weapon, ...rest } = suggestion;
    return rest;
  }

}
