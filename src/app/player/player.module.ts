import { NgModule } from '@angular/core';
import { PlayerListModule } from './player-list/player-list.module';
import { playerRoutes } from './player.routes';
import { PlayerStoreModule } from './store/player.module';

@NgModule({
  imports: [PlayerListModule, playerRoutes, PlayerStoreModule],
})
export class PlayerModule {}
