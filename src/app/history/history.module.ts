import { NgModule } from '@angular/core';

import { DisproveFormComponent } from './turn-form/disprove-form/disprove-form.component';
import { HistoryComponent } from './history.component';
import { RoundComponent } from './round/round.component';
import { SuggestionFormComponent } from './turn-form/suggestion-form/suggestion-form.component';
import { TurnFormComponent } from './turn-form/turn-form.component';

import { historyRoutes } from './history.routes';
import { HistoryGuard } from './history.guard';
import { TurnService } from './turn-form/turn.service';

@NgModule({
  imports: [
    historyRoutes,
  ],
  declarations: [
    DisproveFormComponent,
    HistoryComponent,
    RoundComponent,
    SuggestionFormComponent,
    TurnFormComponent,
  ],
  providers: [
    HistoryGuard,
    TurnService,
  ]
})
export class HistoryModule { }
