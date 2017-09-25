import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from './card';
import { suspects } from './suspect/suspects';
import { rooms } from './room/rooms';
import { weapons } from './weapon/weapons';

@Injectable()
export class CardService {

  constructor() { }

  get(): Observable<Card[]> {
    return Observable.of([...suspects, ...rooms, ...weapons]);
  }

}
