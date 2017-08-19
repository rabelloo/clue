import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';
import { ClueComponent } from './clue.component';
import { ClueRoutingModule } from './clue-routing.module';
import { HistoryComponent } from './history/history.component';
import { PlayerComponent } from './player/player.component';
import { RoomComponent } from './card/room/room.component';
import { SuspectComponent } from './card/suspect/suspect.component';
import { WeaponComponent } from './card/weapon/weapon.component';

@NgModule({
  declarations: [
    CardComponent,
    ClueComponent,
    HistoryComponent,
    PlayerComponent,
    RoomComponent,
    SuspectComponent,
    WeaponComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClueRoutingModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [ClueComponent]
})
export class ClueModule { }
