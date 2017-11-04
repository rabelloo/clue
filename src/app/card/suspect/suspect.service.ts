import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Suspect } from './suspect';
import { suspects } from './suspects';

@Injectable()
export class SuspectService {

  constructor() { }

  get(): Observable<Suspect[]> {
    return of(suspects);
  }

}
