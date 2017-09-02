import { NgModule } from '@angular/core';

import { LocalForageService } from './local-forage.service';
import { LocalForageTable } from './local-forage-table';

@NgModule({
  providers: [
    LocalForageService
  ]
})
export class LocalForageModule { }
