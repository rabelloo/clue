import { Observable } from 'rxjs/Observable';

import * as localforage from 'localforage';
import { ILocalForageEntity } from './ilocal-forage-entity';

export class LocalForageTable {

  protected table: LocalForage;
  protected cast = item => item;

  constructor(protected name: string) {
    this.table = localforage.createInstance({
      name: name
    });
  }

  /**
   * Gets all records
   */
  getAll(): Observable<any[]> {
    return this.keys()
               .switchMap(keys => Observable.forkJoin(
                                    keys.map(key => this.get(key))));
  }

  /**
   * Gets a record by key
   */
  get(key: string | number): Observable<any> {
    return Observable.fromPromise(this.table.getItem('' + key))
              .map(this.cast);
  }

  /**
   * Stores a value with the specified key 
   */
  set(key: string | number, value: any): Observable<any> {
    return Observable.fromPromise(this.table.setItem('' + key, value))
              .map(this.cast);
  }

  /**
   * Removes a record by key
   */
  remove(key: string | number): Observable<void> {
    return Observable.fromPromise(this.table.removeItem('' + key));
  }

  /**
   * Removes all records
   */
  clear(): Observable<void> {
    return Observable.fromPromise(this.table.clear());
  }

  /**
   * Gets the total number of records in the table
   */
  length(): Observable<number> {
    return Observable.fromPromise(this.table.length());
  }

  /**
   * Gets a record's key with the specified table index
   */
  key(index: number): Observable<string> {
    return Observable.fromPromise(this.table.key(index));
  }

  /**
   * Gets all records' keys
   */
  keys(): Observable<string[]> {
    return Observable.fromPromise(this.table.keys());
  }

}
