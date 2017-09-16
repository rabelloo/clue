import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LocalForageIdTable } from '../../core/local-forage/local-forage-id-table';
import { LocalForageService } from '../../core/local-forage/local-forage.service';
import { Turn } from './turn';

@Injectable()
export class TurnService {

  private readonly tableName = 'Turns';
  turns: LocalForageIdTable<Turn>;

  constructor(private localForageService: LocalForageService) {
    this.turns = localForageService.getIdTable<Turn>(this.tableName, Turn);
  }

  getAll(): Observable<Turn[]> {
    return this.turns.getAll()
              .map(turns => turns
                              .sortBy(turn => turn.order)
                              .sortBy(turn => turn.round)
                  );
  }

  save(turn: Turn): Observable<Turn> {
    return this.turns.save(this.getSavePreparedTurn(turn));
  }

  delete(turn: Turn): Observable<void> {
    return this.turns.delete(turn);
  }

  private getSavePreparedTurn(turn: Turn): Turn {
    const turnForSave = new Turn(turn);

    delete turnForSave.disprove.card;
    delete turnForSave.disprove.player;
    delete turnForSave.suggestion.suspect;
    delete turnForSave.suggestion.room;
    delete turnForSave.suggestion.weapon;
    delete turnForSave.player;

    return turnForSave;
  }

}
