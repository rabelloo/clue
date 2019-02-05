import { NgModule } from '@angular/core';
import { HistoryComponent } from './history.component';
import { historyRoutes } from './history.routes';
import { RoundComponent } from './round/round.component';
import { DisproveFormComponent } from './turn-form/disprove-form/disprove-form.component';
import { SuggestionFormComponent } from './turn-form/suggestion-form/suggestion-form.component';
import { TurnFormComponent } from './turn-form/turn-form.component';

@NgModule({
  imports: [historyRoutes],
  declarations: [
    DisproveFormComponent,
    HistoryComponent,
    RoundComponent,
    SuggestionFormComponent,
    TurnFormComponent,
  ],
})
export class HistoryModule {}
