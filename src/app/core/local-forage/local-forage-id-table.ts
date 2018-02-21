import { Observable } from 'rxjs/Observable';
import { Type } from '@angular/core';

import * as localforage from 'localforage';
import { ILocalForageEntity } from './ilocal-forage-entity';
import { LocalForageTable } from './local-forage-table';

export class LocalForageIdTable<T extends ILocalForageEntity> extends LocalForageTable {

  private idMap: LocalForageTable;
  private currentId: number;

  /**
   * Creates a new instance of a `LocalForageIdTable`,
   * which has auto incremental Ids for its entities
   */
  constructor(name: string) {
    super(name);
    this.idMap = new LocalForageTable('PrimaryKeys');
    this.getCurrentId();

    this.cast = entity => entity as T;
  }

  /**
   * Gets all entities
   */
  getAll(): Observable<T[]> {
    return super.getAll();
  }

  /**
   * Gets an entity by key
   */
  get(key: string | number): Observable<T> {
    return super.get(key);
  }

  /**
   * Stores an entity with its id or an auto generated one
   */
  save(entity: T): Observable<T> {
    let insertingEntity = entity;

    if (!entity.id) {
      // Double casting from and to T needs to be done as a hack because
      // TS doesn't support type inference for generics as objects yet
      // https://github.com/Microsoft/TypeScript/issues/10727
      // TODO: remove casts when it does
      insertingEntity = { ...entity as {}, id: this.nextId() } as T;
    }

    return super.set(insertingEntity.id, insertingEntity);
  }

  /**
   * Deletes an entity
   */
  delete(entity: T): Observable<void> {
    return super.remove(entity.id);
  }

  private getCurrentId(): void {
    this.idMap
        .get(this.name)
        .subscribe(id => {
            if (!id) {
              this.idMap.set(this.name, 0);
            }

            this.currentId = id as number || 0;
        });
  }

  private nextId(): number {
    this.idMap.set(this.name, ++this.currentId);
    return this.currentId;
  }
}
