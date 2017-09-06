import { NgModule } from '@angular/core';

import { ApiService } from './api/api.service';
import { FooterComponent } from './footer/footer.component';
import { LocalForageService } from './local-forage/local-forage.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Notifier } from './notifier/notifier.service';
import { RxJSModule } from './rx-js/rx-js.module';
import { SharedModule } from '../shared/shared.module';

import './prototype-extensions/array-extensions';
import './prototype-extensions/string-extensions';

const coreComponents = [
  FooterComponent,
  NavBarComponent,
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [RxJSModule].concat(coreComponents),
  declarations: coreComponents,
  providers: [
    ApiService,
    LocalForageService,
    Notifier
  ]
})
export class CoreModule { }
