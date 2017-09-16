import { Injectable, Type } from '@angular/core';

import { ILocalForageEntity } from './ilocal-forage-entity';
import { LocalForageTable } from './local-forage-table';
import { LocalForageIdTable } from './local-forage-id-table';

@Injectable()
export class LocalForageService {

  constructor() { }

  getTable(name: string) {
    return new LocalForageTable(name);
  }

  getIdTable<T extends ILocalForageEntity>(name: string, constructor: Type<T>) {
    return new LocalForageIdTable(name, constructor);
  }
}
