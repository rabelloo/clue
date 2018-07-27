import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardGuard } from '../card/card.guard';
import { HistoryComponent } from './history.component';
import { HistoryGuard } from './history.guard';

export const historyRoutes = RouterModule.forChild([
    { path: '', component: HistoryComponent, canActivate: [CardGuard, HistoryGuard] }
]);
