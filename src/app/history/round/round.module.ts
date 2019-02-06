import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
} from '@angular/material';
import { TurnFormModule } from '../turn-form/turn-form.module';
import { RoundComponent } from './round.component';

const components = [RoundComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    TurnFormModule,
  ],
})
export class RoundModule {}
