import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { FooterComponent } from './footer.component';

const components = [FooterComponent];

@NgModule({
  imports: [FlexLayoutModule, MatToolbarModule, MatButtonModule],
  declarations: components,
  exports: components,
})
export class FooterModule {}
