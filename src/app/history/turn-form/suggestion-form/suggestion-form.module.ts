import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ErrorMessagesModule } from '../../../error-messages/error-messages.module';
import { SuggestionFormComponent } from './suggestion-form.component';

const components = [SuggestionFormComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    ErrorMessagesModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class SuggestionFormModule {}
