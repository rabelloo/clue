import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardGuard } from '../card/card.guard';
import { PlayerGuard } from './player.guard';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
    { path: 'players', component: PlayerListComponent, canActivate: [CardGuard, PlayerGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class PlayerRoutingModule { }
