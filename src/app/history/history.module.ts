import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';
import { RoundComponent } from './round/round.component';
import { TurnComponent } from './turn/turn.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HistoryComponent,
    RoundComponent,
    TurnComponent
  ],
  providers: [
    HistoryService,
  ]
})
export class HistoryModule { }
