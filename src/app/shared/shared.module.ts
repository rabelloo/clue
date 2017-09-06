import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { DebugPipe } from './debug/debug.pipe';
import { ErrorMessagesDirective } from './error-messages/error-messages.directive';
import { MaterialModule } from './material.module';

const declarations: any[] = [
  DebugPipe,
  ErrorMessagesDirective,
];

@NgModule({
  exports: declarations.concat([
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ]),
  declarations: declarations
})
export class SharedModule { }
