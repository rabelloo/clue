import { Observable, forkJoin, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as localforage from 'localforage';

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
    return from(this.table.getItem('' + key))
              .pipe(
                map(this.cast)
              );
  }

  /**
   * Stores a value with the specified key
   */
  set(key: string | number, value: any): Observable<any> {
    return from(this.table.setItem('' + key, value))
              .pipe(
                map(this.cast)
              );
  }

  /**
   * Removes a record by key
   */
  remove(key: string | number): Observable<void> {
    return from(this.table.removeItem('' + key));
  }

  /**
   * Removes all records
   */
  clear(): Observable<void> {
    return from(this.table.clear());
  }

  /**
   * Gets the total number of records in the table
   */
  length(): Observable<number> {
    return from(this.table.length());
  }

  /**
   * Gets a record's key with the specified table index
   */
  key(index: number): Observable<string> {
    return from(this.table.key(index));
  }

  /**
   * Gets all records' keys
   */
  keys(): Observable<string[]> {
    return from(this.table.keys());
  }

}
