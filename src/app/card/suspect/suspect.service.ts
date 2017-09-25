import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Suspect } from './suspect';
import { suspects } from './suspects';

@Injectable()
export class SuspectService {

  constructor() { }

  get(): Observable<Suspect[]> {
    return Observable.of(suspects);
  }

}
