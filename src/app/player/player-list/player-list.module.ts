import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';

import { PlayerFormModule } from '../player-form/player-form.module';

import { PlayerListComponent } from './player-list.component';

const components = [PlayerListComponent];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PlayerFormModule,
    ReactiveFormsModule,
  ],
  declarations: components,
  exports: components,
})
export class PlayerListModule { }
