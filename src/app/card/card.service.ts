import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from './card';
import { rooms } from './room/rooms';
import { suspects } from './suspect/suspects';
import { weapons } from './weapon/weapons';

@Injectable({ providedIn: 'root' })
export class CardService {
  constructor() {}

  get(): Observable<Card[]> {
    return of([...suspects, ...rooms, ...weapons]);
  }
}
