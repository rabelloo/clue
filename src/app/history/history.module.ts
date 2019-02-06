import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
} from '@angular/material';
import { PlayerStoreModule } from '../player/store/player.module';
import { HistoryComponent } from './history.component';
import { historyRoutes } from './history.routes';
import { RoundModule } from './round/round.module';
import { HistoryStoreModule } from './store/history.module';

const components = [HistoryComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    historyRoutes,
    HistoryStoreModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    PlayerStoreModule,
    RoundModule,
  ],
})
export class HistoryModule {}
