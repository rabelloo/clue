import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdInputModule } from '@angular/material';

import { PlayerComponent } from './player.component';
import { PlayerService } from './player.service';
import { ApiService } from '../api/api.service';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdInputModule
  ],
  declarations: [
    PlayerComponent
  ],
  providers: [
    ApiService,
    PlayerService
  ]
})
export class PlayerModule { }
