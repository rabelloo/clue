import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';
import { hmrMetaReducer } from '../../hmr';
import { AuthModule } from './auth/auth.module';
import { logReducer } from './log.reducer';
import './prototype-extensions/array-extensions';
import './prototype-extensions/string-extensions';

const metaReducers = environment.production ? [] : [hmrMetaReducer, logReducer];

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
})
export class CoreModule {}
