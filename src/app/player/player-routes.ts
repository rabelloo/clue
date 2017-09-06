import { Routes } from '@angular/router';

import { PlayerListComponent } from './player-list/player-list.component';

export const playerRoutes: Routes = [
    { path: 'players', component: PlayerListComponent }
];