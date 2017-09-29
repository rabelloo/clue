import { Routes } from '@angular/router';

import { HistoryComponent } from './history.component';
import { PlayerGuard } from '../player/player.guard';

export const historyRoutes: Routes = [
    {
        path: 'history',
        component: HistoryComponent,
        canActivate: [PlayerGuard]
    }
];
