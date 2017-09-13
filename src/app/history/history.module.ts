import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';
import { RoundComponent } from './round/round.component';
import { TurnFormComponent } from './turn-form/turn-form.component';
import { TurnService } from './turn/turn.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    HistoryComponent,
    RoundComponent,
    TurnFormComponent
  ],
  providers: [
    HistoryService,
    TurnService,
  ]
})
export class HistoryModule { }
