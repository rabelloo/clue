import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Suspect } from './suspect';
import { suspects } from './suspects';

@Injectable()
export class SuspectService {

  constructor() { }

  get(): Observable<Suspect[]> {
    return of(suspects);
  }

}
