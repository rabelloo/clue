import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FooterComponent } from './footer/footer.component';
import { LocalForageService } from './local-forage/local-forage.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { Notifier } from './notifier/notifier.service';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { metaReducers } from '../../hmr';

import './prototype-extensions/array-extensions';
import './prototype-extensions/string-extensions';

const coreComponents = [
  FooterComponent,
  NavBarComponent,
];

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    EffectsModule.forRoot(effects),
    SharedModule,
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  exports: coreComponents,
  declarations: coreComponents,
  providers: [
    LocalForageService,
    Notifier,
  ]
})
export class CoreModule { }
