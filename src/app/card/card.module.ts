import { NgModule } from '@angular/core';

import { CardResolver } from './card.resolver';
import { RoomService } from './room/room.service';
import { SuspectService } from './suspect/suspect.service';
import { WeaponService } from './weapon/weapon.service';

@NgModule({
  providers: [
    CardResolver,
    RoomService,
    SuspectService,
    WeaponService,
  ],
})
export class CardModule { }
