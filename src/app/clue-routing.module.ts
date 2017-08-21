import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerRoutingModule } from './player/player-routing.module';

const routes: Routes = [
    { path: '', redirectTo: '/players', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PlayerRoutingModule
    ],
    exports: [
        RouterModule
    ]
})
export class ClueRoutingModule { }