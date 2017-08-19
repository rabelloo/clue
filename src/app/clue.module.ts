import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClueComponent } from './clue.component';

@NgModule({
  declarations: [
    ClueComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ClueComponent]
})
export class ClueModule { }
