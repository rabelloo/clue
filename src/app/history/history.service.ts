import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LocalForageIdTable } from '../core/local-forage/local-forage-id-table';
import { LocalForageService } from '../core/local-forage/local-forage.service';
import { Round } from './round/round';
import { Turn } from './turn/turn';

@Injectable()
export class HistoryService {

  private readonly tableName = 'Turns';
  turns: LocalForageIdTable<Turn>;

  constructor(private localForageService: LocalForageService) {
    this.turns = localForageService.getIdTable<Turn>(this.tableName, Turn);
  }

  getRounds(): Observable<Round[]> {
    return this.getTurns()
                .flatMap(turns => turns)
                .groupBy(turn => turn.round)
                .flatMap(group =>
                  group.reduce((rounds, turn) => [...rounds, turn], [])
                       .map(t => new Round({ number: group.key, turns: t }))
                )
                .zip();
  }

  getTurns(): Observable<Turn[]> {
    return this.turns.getAll();
  }

}
