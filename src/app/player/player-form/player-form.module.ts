import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';

import { DetectorsModule } from '../../detectors/detectors.module';

import { PlayerFormComponent } from './player-form.component';

const components = [PlayerFormComponent];

@NgModule({
  imports: [
    CommonModule,
    DetectorsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  declarations: components,
  exports: components,
})
export class PlayerFormModule { }
