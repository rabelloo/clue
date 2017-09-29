import { NgModule } from '@angular/core';

import { CardGuard } from './card.guard';
import { CardService } from './card.service';
import { RoomService } from './room/room.service';
import { SuspectService } from './suspect/suspect.service';
import { WeaponService } from './weapon/weapon.service';

@NgModule({
  providers: [
    CardGuard,
    CardService,
    RoomService,
    SuspectService,
    WeaponService,
  ],
})
export class CardModule { }
