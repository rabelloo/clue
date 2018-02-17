import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HotModuleReplacementModule } from '../hmr';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HistoryModule } from './history/history.module';
import { PlayerModule } from './player/player.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { environment } from '../environments/environment';


@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HistoryModule,
    PlayerModule,
    SharedModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
  ],
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule extends HotModuleReplacementModule {
  constructor(appRef: ApplicationRef) {
    super(appRef);
  }
}
