import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Suspect } from "./suspect";
import { Suspects } from "./suspects";

@Injectable()
export class SuspectService {

  constructor() { }

  get(): Observable<Suspect[]> {
    return Observable.of(Suspects);
  }

}
