import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTooltipModule,
} from '@angular/material';
import { ErrorMessagesModule } from '../../error-messages/error-messages.module';
import { PlayerFormComponent } from './player-form.component';

const components = [PlayerFormComponent];

@NgModule({
  imports: [
    CommonModule,
    ErrorMessagesModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  declarations: components,
  exports: components,
})
export class PlayerFormModule {}
