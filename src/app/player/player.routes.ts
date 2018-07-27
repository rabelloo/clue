import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardGuard } from '../card/card.guard';
import { PlayerListComponent } from './player-list/player-list.component';

export const playerRoutes = RouterModule.forChild([
    { path: '', component: PlayerListComponent, canActivate: [CardGuard] }
]);
