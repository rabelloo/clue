import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CardEffects } from './store/card.effects';
import { CardReducer } from './store/card.reducer';

import { CardGuard } from './card.guard';
import { CardService } from './card.service';
import { RoomService } from './room/room.service';
import { SuspectService } from './suspect/suspect.service';
import { WeaponService } from './weapon/weapon.service';

@NgModule({
  imports: [
    EffectsModule.forFeature([CardEffects]),
    StoreModule.forFeature('cards', CardReducer),
  ],
  providers: [
    CardGuard,
    CardService,
    RoomService,
    SuspectService,
    WeaponService,
  ],
})
export class CardModule { }
