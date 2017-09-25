import { Routes } from '@angular/router';

import { CardGuard } from '../card/card.guard';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerGuard } from './player.guard';

export const playerRoutes: Routes = [
    { path: 'players', component: PlayerListComponent, canActivate: [CardGuard, PlayerGuard] }
];
