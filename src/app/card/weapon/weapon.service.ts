import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Weapon } from './weapon';
import { weapons } from './weapons';

@Injectable()
export class WeaponService {

  constructor() { }

  get(): Observable<Weapon[]> {
    return of(weapons);
  }

}
