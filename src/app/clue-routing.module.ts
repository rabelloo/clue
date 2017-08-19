import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player/player.component';
import { HistoryComponent } from './history/history.component';

const clueRoutes: Routes = [
    { path: 'players', component: PlayerComponent },
    { path: 'history', component: HistoryComponent },
    { path: '', redirectTo: '/players', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(clueRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ClueRoutingModule { }