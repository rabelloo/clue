import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Room } from './room';
import { rooms } from './rooms';

@Injectable()
export class RoomService {

  constructor() { }

  get(): Observable<Room[]> {
    return of(rooms);
  }

}
