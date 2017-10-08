import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardGuard } from './card/card.guard';
import { historyRoutes } from './history/history-routes';
import { PlayerGuard } from './player/player.guard';
import { playerRoutes } from './player/player-routes';

const routes: Routes = [
    { path: '', redirectTo: 'players', pathMatch: 'full' },
    {
        path: '',
        canActivate: [CardGuard, PlayerGuard],
        children: [
            ...playerRoutes,
            ...historyRoutes,
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
