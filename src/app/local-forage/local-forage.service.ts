import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';

import { LocalForageTable } from './local-forage-table';

@Injectable()
export class LocalForageService {

  constructor(private table: LocalForageTable) { }

  get(key?: string | number): Observable<any> {
    if (key)
      return Observable.fromPromise(this.table.instance.getItem('' + key));

    return this.keys()
            .map(key => this.get(key));
  }

  set(key: string | number, value: any): Observable<any> {
      return Observable.fromPromise(this.table.instance.setItem('' + key, value));
  }

  remove(key: string | number): Observable<any> {
      return Observable.fromPromise(this.table.instance.removeItem('' + key));
  }

  clear(): Observable<any> {
      return Observable.fromPromise(this.table.instance.clear());
  }

  length(): Observable<number> {
      return Observable.fromPromise(this.table.instance.length());
  }

  key(index: number): Observable<string> {
      return Observable.fromPromise(this.table.instance.key(index));
  }

  keys(): Observable<string> {
      return Observable.fromPromise(this.table.instance.keys())
              .concatMap(key => key);
  }
}