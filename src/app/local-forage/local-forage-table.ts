import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';

import * as localforage from 'localforage';

export class LocalForageTable<T> {
    
  private table: LocalForage;

  constructor(name: string) { 
    this.table = localforage.createInstance({
        name: name
    });
  }

  get(key?: string | number): Observable<T> {
    if (key)
      return Observable.fromPromise(this.table.getItem('' + key));

    return this.keys()
            .switchMap(key => this.get(key));
  }

  set(key: string | number, value: T): Observable<T> {
      return Observable.fromPromise(this.table.setItem('' + key, value));
  }

  remove(key: string | number): Observable<void> {
      return Observable.fromPromise(this.table.removeItem('' + key));
  }

  clear(): Observable<void> {
      return Observable.fromPromise(this.table.clear());
  }

  length(): Observable<number> {
      return Observable.fromPromise(this.table.length());
  }

  key(index: number): Observable<string> {
      return Observable.fromPromise(this.table.key(index));
  }

  keys(): Observable<string> {
      return Observable.fromPromise(this.table.keys())
              .concatMap(key => key);
  }
}