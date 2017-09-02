import { Observable } from 'rxjs/Observable';

import * as localforage from 'localforage';
import { ILocalForageEntity } from './ilocal-forage-entity';

export class LocalForageTable<T extends ILocalForageEntity> {
    
  private table: LocalForage;
  private currentId: number;

  constructor(name: string) { 
    this.table = localforage.createInstance({
        name: name
    });
    this.getCurrentId();
  }

  private getCurrentId(): void {
    this.length()
        .filter(length => length > 0)
        .map(length => length - 1)
        .switchMap(index => this.key(index))
        .switchMap(key => this.get(key))
        .map(item => item.id)
        .defaultIfEmpty(0)
        .last()
        .subscribe(id => this.currentId = id || 0);
  }

  /**
   * Gets all entities
   */
  getAll(): Observable<T[]> {
    return this.keys()
            .mergeMap(keys => keys)
            .map(key => this.get(key))
            .zip();
  }

  /**
   * Gets an entity by key
   */
  get(key: string | number): Observable<T> {
      return Observable.fromPromise(this.table.getItem('' + key));
  }
  
  /**
   * Stores an entity with the specified key 
   */
  set(key: string | number, entity: T): Observable<T> {
      return Observable.fromPromise(this.table.setItem('' + key, entity));
  }

  /**
   * Stores an entity with its id or an auto generated one
   */
  save(entity: T): Observable<T> {
    if (!entity.id)
        entity.id = ++this.currentId;

    return Observable.fromPromise(this.table.setItem('' + entity.id, entity));
  }

  /**
   * Removes an entity with the specified key 
   */
  remove(key: string | number): Observable<void> {
      return Observable.fromPromise(this.table.removeItem('' + key));
  }

  /**
   * Removes all entities 
   */
  clear(): Observable<void> {
      return Observable.fromPromise(this.table.clear());
  }

  /**
   * Gets the total number of entities in the table
   */
  length(): Observable<number> {
      return Observable.fromPromise(this.table.length());
  }

  /**
   * Gets an entity's key with the specified table index
   */
  key(index: number): Observable<string> {
      return Observable.fromPromise(this.table.key(index));
  }

  /**
   * Gets all entities's keys
   */
  keys(): Observable<string[]> {
      return Observable.fromPromise(this.table.keys());
  }
}