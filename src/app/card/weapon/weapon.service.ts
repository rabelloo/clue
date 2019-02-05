import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weapon } from './weapon';
import { weapons } from './weapons';

@Injectable({ providedIn: 'root' })
export class WeaponService {
  constructor() {}

  get(): Observable<Weapon[]> {
    return of(weapons);
  }
}
