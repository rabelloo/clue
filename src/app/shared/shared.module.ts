import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
