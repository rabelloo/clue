import { Routes } from '@angular/router';

import { HistoryComponent } from './history.component';
import { PlayerResolver } from '../player/player.resolver';

export const historyRoutes: Routes = [
    {
        path: 'history',
        component: HistoryComponent,
        resolve: {
            players: PlayerResolver
        }
    }
];