import { Injectable } from '@angular/core';

import { LocalForageTable } from './local-forage-table';
import { ILocalForageEntity } from "./ilocal-forage-entity";

@Injectable()
export class LocalForageService {
    
  constructor() { }

  getTable<T extends ILocalForageEntity>(name: string) {
    return new LocalForageTable<T>(name);
  }
}