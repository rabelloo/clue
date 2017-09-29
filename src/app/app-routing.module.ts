import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardGuard } from './card/card.guard';
import { playerRoutes } from './player/player-routes';
import { historyRoutes } from './history/history-routes';

const routes: Routes = [
    { path: '**', redirectTo: 'players' },
    {
        path: '',
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
