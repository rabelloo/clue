import { NgModule } from '@angular/core';

import { RoomService } from "./room/room.service";
import { SuspectService } from "./suspect/suspect.service";
import { WeaponService } from "./weapon/weapon.service";

@NgModule({
  providers: [
    RoomService,
    SuspectService,
    WeaponService,
  ]
})
export class CardModule { }
