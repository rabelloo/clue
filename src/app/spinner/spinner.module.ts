import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';

const components = [SpinnerComponent];

@NgModule({
  declarations: components,
  exports: components,
})
export class SpinnerModule {}
