import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Card } from './card';
import { suspects } from './suspect/suspects';
import { rooms } from './room/rooms';
import { weapons } from './weapon/weapons';

@Injectable()
export class CardService {

  constructor() { }

  get(): Observable<Card[]> {
    return of([...suspects, ...rooms, ...weapons]);
  }

}
