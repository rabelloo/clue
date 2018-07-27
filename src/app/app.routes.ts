import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const appRoutes = RouterModule.forRoot([
    { path: '', redirectTo: 'players', pathMatch: 'full' },
    { path: 'players', loadChildren: './player/player.module#PlayerModule' },
    { path: 'history', loadChildren: './history/history.module#HistoryModule' },
]);
