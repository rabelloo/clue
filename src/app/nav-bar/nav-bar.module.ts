import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from './nav-bar.component';

const components = [NavBarComponent];

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
  ],
  declarations: components,
  exports: components,
})
export class NavBarModule { }
