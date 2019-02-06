import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HistoryLoadedReducer } from './history-loaded.reducer';
import { HistoryEffects } from './history.effects';
import { HistoryReducer } from './history.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([HistoryEffects]),
    StoreModule.forFeature('history', HistoryReducer),
    StoreModule.forFeature('historyLoaded', HistoryLoadedReducer),
  ],
})
export class HistoryStoreModule {}
