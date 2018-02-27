import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardGuard } from '../card/card.guard';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
    { path: 'players', component: PlayerListComponent, canActivate: [CardGuard] }
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
