import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ClueComponent } from './clue.component';
import { ClueRoutingModule } from './clue-routing.module';
import { FooterModule } from "./footer/footer.module";
import { PlayerModule } from './player/player.module';
import { NavBarModule } from './nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    ClueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClueRoutingModule,
    FooterModule,
    NavBarModule,
    PlayerModule,
  ],
  providers: [],
  bootstrap: [ClueComponent]
})
export class ClueModule { }
