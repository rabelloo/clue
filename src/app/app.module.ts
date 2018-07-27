import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HotModuleReplacementModule } from '../hmr';

import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { FooterModule } from './footer/footer.module';
import { NavBarModule } from './nav-bar/nav-bar.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { CardModule } from './card/card.module';


@NgModule({
  imports: [
    appRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    CoreModule,
    FooterModule,
    NavBarModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule extends HotModuleReplacementModule {
  constructor(appRef: ApplicationRef) {
    super(appRef);
  }
}
