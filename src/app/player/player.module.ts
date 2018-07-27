import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { playerRoutes } from './player.routes';
import { PlayerEffects } from './store/player.effects';
import { PlayerReducer } from './store/player.reducer';
import { PlayerListModule } from './player-list/player-list.module';

import { PlayerService } from './player.service';

@NgModule({
  imports: [
    EffectsModule.forFeature([PlayerEffects]),
    StoreModule.forFeature('players', PlayerReducer),
    PlayerListModule,
    playerRoutes,
  ],
  providers: [
    PlayerService,
  ]
})
export class PlayerModule { }
