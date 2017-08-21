import { NgModule } from '@angular/core';
import { MdToolbarModule } from "@angular/material";

import { NavBarComponent } from "./nav-bar.component";

@NgModule({
  imports: [
    MdToolbarModule
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
