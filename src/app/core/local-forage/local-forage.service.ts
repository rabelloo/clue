import { Injectable } from '@angular/core';
import { ILocalForageEntity } from './ilocal-forage-entity';
import { LocalForageIdTable } from './local-forage-id-table';
import { LocalForageTable } from './local-forage-table';

@Injectable()
export class LocalForageService {
  constructor() {}

  getTable(name: string) {
    return new LocalForageTable(name);
  }

  getIdTable<T extends ILocalForageEntity>(name: string) {
    return new LocalForageIdTable<T>(name);
  }
}
