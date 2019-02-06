import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { ErrorMessagesModule } from '../../../error-messages/error-messages.module';
import { DisproveFormComponent } from './disprove-form.component';

const components = [DisproveFormComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    ErrorMessagesModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class DisproveFormModule {}
