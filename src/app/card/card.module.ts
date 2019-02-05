import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CardEffects } from './store/card.effects';
import { CardReducer } from './store/card.reducer';

@NgModule({
  imports: [
    EffectsModule.forFeature([CardEffects]),
    StoreModule.forFeature('cards', CardReducer),
  ],
})
export class CardModule {}
