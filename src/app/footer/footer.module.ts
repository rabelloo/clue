import { NgModule } from '@angular/core';
import { MdToolbarModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    MdToolbarModule,
    FlexLayoutModule,
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
