import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import './prototype-extensions/array-extensions';
import './prototype-extensions/string-extensions';

import { environment } from '../../environments/environment';
import { logger, stateSetter } from '../../hmr';

import { AuthModule } from './auth/auth.module';

import { Notifier } from './notifier/notifier.service';

const metaReducers = environment.production ? [] : [ logger, stateSetter ];

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AuthModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, { metaReducers }),
  ],
  providers: [
    Notifier,
  ]
})
export class CoreModule { }
