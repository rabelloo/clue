import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerComponent } from './player.component';

const routes: Routes = [
    { path: 'players', component: PlayerComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PlayerRoutingModule { }