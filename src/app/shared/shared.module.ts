import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DebugPipe } from './debug/debug.pipe';
import { ErrorMessagesDirective } from './error-messages/error-messages.directive';
import { MaterialModule } from './material.module';

const components = [
  DebugPipe,
  ErrorMessagesDirective,
];

const modules = [
  CommonModule,
  FlexLayoutModule,
  MaterialModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  imports: modules,
  exports: [
    ...modules,
    ...components
  ],
  declarations: components
})
export class SharedModule { }
