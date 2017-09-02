import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalForageService } from './local-forage.service';
import { LocalForageTable } from './local-forage-table';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LocalForageService
  ]
})
export class LocalForageModule { }
