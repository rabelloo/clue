import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ApiService } from './api/api.service';
import { FooterComponent } from './footer/footer.component';
import { LocalForageService } from './local-forage/local-forage.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Notifier } from './notifier/notifier.service';
import { RxJSModule } from './rx-js/rx-js.module';
import { SharedModule } from '../shared/shared.module';

import { effects } from './store/effects';
import { reducers } from './store/reducers';

import './prototype-extensions/array-extensions';
import './prototype-extensions/string-extensions';

const coreComponents = [
  FooterComponent,
  NavBarComponent,
];

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
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
