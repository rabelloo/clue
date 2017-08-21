import { NgModule } from '@angular/core';
import { MdToolbarModule } from "@angular/material";

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    MdToolbarModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
