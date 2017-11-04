import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HistoryModule } from './history/history.module';
import { PlayerModule } from './player/player.module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HistoryModule,
    PlayerModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
