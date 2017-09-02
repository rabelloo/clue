import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdInputModule, MdIconModule, MdSelectModule } from '@angular/material';

import { CardModule } from "../card/card.module";
import { LocalForageModule } from '../local-forage/local-forage.module';
import { PlayerComponent } from './player.component';
import { PlayerService } from './player.service';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    LocalForageModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdIconModule,
    MdSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PlayerComponent
  ],
  providers: [
    PlayerService
  ]
})
export class PlayerModule { }
