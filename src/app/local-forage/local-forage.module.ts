import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalForageService } from './local-forage.service';
import { LocalForageTable } from './local-forage-table';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LocalForageService
  ],
  declarations: []
})
export class LocalForageModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: LocalForageModule,
        providers: [
          {
              provide: LocalForageTable,
              useValue: LocalForageTable
          },
          LocalForageService
        ]
    };
  }
}
