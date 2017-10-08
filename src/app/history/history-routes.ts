import { Routes } from '@angular/router';

import { HistoryComponent } from './history.component';
import { HistoryGuard } from './history.guard';

export const historyRoutes: Routes = [
    {
        path: 'history',
        component: HistoryComponent,
        canActivate: [HistoryGuard]
    }
];
