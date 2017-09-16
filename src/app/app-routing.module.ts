import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardResolver } from './card/card.resolver';
import { playerRoutes } from './player/player-routes';
import { historyRoutes } from './history/history-routes';

const routes: Routes = [
    {
        path: '',
        resolve: {
            cards: CardResolver
        },
        children: [].concat(
            [
                { path: '', redirectTo: 'players', pathMatch: 'full' }
            ],
            playerRoutes,
            historyRoutes,
        )
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
