import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, map } from 'rxjs/operators';

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
               .pipe(
                  switchMap(keys => forkJoin( keys.map(key => this.get(key) )))
               );
  }

  /**
   * Gets a record by key
   */
  get(key: string | number): Observable<any> {
    return fromPromise(this.table.getItem('' + key))
              .pipe(
                map(this.cast)
              );
  }

  /**
   * Stores a value with the specified key
   */
  set(key: string | number, value: any): Observable<any> {
    return fromPromise(this.table.setItem('' + key, value))
              .pipe(
                map(this.cast)
              );
  }

  /**
   * Removes a record by key
   */
  remove(key: string | number): Observable<void> {
    return fromPromise(this.table.removeItem('' + key));
  }

  /**
   * Removes all records
   */
  clear(): Observable<void> {
    return fromPromise(this.table.clear());
  }

  /**
   * Gets the total number of records in the table
   */
  length(): Observable<number> {
    return fromPromise(this.table.length());
  }

  /**
   * Gets a record's key with the specified table index
   */
  key(index: number): Observable<string> {
    return fromPromise(this.table.key(index));
  }

  /**
   * Gets all records' keys
   */
  keys(): Observable<string[]> {
    return fromPromise(this.table.keys());
  }

}
