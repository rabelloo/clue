import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CardCollection } from './card-collection';
import { Room } from './room/room';
import { RoomService } from './room/room.service';
import { Suspect } from './suspect/suspect';
import { SuspectService } from './suspect/suspect.service';
import { Weapon } from './weapon/weapon';
import { WeaponService } from './weapon/weapon.service';

@Injectable()
export class CardResolver implements Resolve<CardCollection> {

  constructor(private roomService: RoomService,
              private suspectService: SuspectService,
              private weaponService: WeaponService) {
      //
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Observable.forkJoin(
                        this.roomService.get(),
                        this.suspectService.get(),
                        this.weaponService.get()
                      )
                      .map(([rooms, suspects, weapons]) => <CardCollection> {
                          rooms: rooms,
                          suspects: suspects,
                          weapons: weapons
                      });
  }

}