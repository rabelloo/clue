import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DisproveFormComponent } from './turn-form/disprove-form/disprove-form.component';
import { HistoryComponent } from './history.component';
import { HistoryService } from './history.service';
import { RoundComponent } from './round/round.component';
import { SuggestionFormComponent } from './turn-form/suggestion-form/suggestion-form.component';
import { TurnFormComponent } from './turn-form/turn-form.component';
import { TurnService } from './turn/turn.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DisproveFormComponent,
    HistoryComponent,
    RoundComponent,
    SuggestionFormComponent,
    TurnFormComponent,
  ],
  providers: [
    HistoryService,
    TurnService,
  ]
})
export class HistoryModule { }
