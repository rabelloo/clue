import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Weapon } from "./weapon";
import { Weapons } from "./weapons";

@Injectable()
export class WeaponService {

  constructor() { }

  get(): Observable<Weapon[]> {
    return Observable.of(Weapons);
  }

}
