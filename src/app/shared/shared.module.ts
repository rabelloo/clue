import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { DebugPipe } from './debug/debug.pipe';
import { MaterialModule } from './material.module';

@NgModule({
  exports: [
    CommonModule,
    DebugPipe,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DebugPipe,
  ]
})
export class SharedModule { }
