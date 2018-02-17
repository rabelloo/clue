import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardGuard } from './card/card.guard';
import { PlayerGuard } from './player/player.guard';
import { PlayerListComponent } from './player/player-list/player-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'players', pathMatch: 'full' },
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
