import { NgModule } from '@angular/core';
import { ErrorMessagesDirective } from './error-messages.directive';

const components = [ErrorMessagesDirective];

@NgModule({
  declarations: [components],
  exports: [components],
})
export class ErrorMessagesModule {}
