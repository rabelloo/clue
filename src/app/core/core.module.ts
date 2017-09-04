import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApiService } from './api/api.service';
import { FooterComponent } from './footer/footer.component';
import { LocalForageService } from './local-forage/local-forage.service';
import { MaterialModule } from '../shared/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RxJSModule } from './rx-js/rx-js.module';

const coreComponents = [
  FooterComponent,
  NavBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [RxJSModule].concat(coreComponents),
  declarations: coreComponents,
  providers: [
    ApiService,
    LocalForageService
  ]
})
export class CoreModule { }
