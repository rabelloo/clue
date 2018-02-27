import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardGuard } from '../card/card.guard';
import { HistoryComponent } from './history.component';
import { HistoryGuard } from './history.guard';

const routes: Routes = [
    { path: 'history', component: HistoryComponent, canActivate: [CardGuard, HistoryGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class HistoryRoutingModule { }
