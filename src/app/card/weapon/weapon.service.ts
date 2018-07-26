import { Injectable } from '@angular/core';
import { Observable, of, observable } from 'rxjs';

import { Weapon } from './weapon';
import { weapons } from './weapons';

@Injectable()
export class WeaponService {

  constructor() { }

  get(): Observable<Weapon[]> {
    return of(weapons);
  }

}
