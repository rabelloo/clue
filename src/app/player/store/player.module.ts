import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PlayerEffects } from './player.effects';
import { PlayerReducer } from './player.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([PlayerEffects]),
    StoreModule.forFeature('players', PlayerReducer),
  ],
})
export class PlayerStoreModule {}
