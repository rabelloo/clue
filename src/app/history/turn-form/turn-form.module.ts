import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { ErrorMessagesModule } from '../../error-messages/error-messages.module';
import { DisproveFormModule } from './disprove-form/disprove-form.module';
import { SuggestionFormModule } from './suggestion-form/suggestion-form.module';
import { TurnFormComponent } from './turn-form.component';

const components = [TurnFormComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    DisproveFormModule,
    ErrorMessagesModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    SuggestionFormModule,
  ],
})
export class TurnFormModule {}
