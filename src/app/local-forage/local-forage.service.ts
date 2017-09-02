import { Injectable } from '@angular/core';

import { LocalForageTable } from './local-forage-table';

@Injectable()
export class LocalForageService {
    
  constructor() { }

  getTable<T>(name: string) {
    return new LocalForageTable<T>(name);
  }
}