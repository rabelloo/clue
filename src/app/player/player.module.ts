import { NgModule } from '@angular/core';

import { CardModule } from '../card/card.module';
import { PlayerFormComponent } from './player-form/player-form.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerGuard } from './player.guard';
import { PlayerService } from './player.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CardModule,
    SharedModule,
  ],
  declarations: [
    PlayerFormComponent,
    PlayerListComponent,
  ],
  providers: [
    PlayerGuard,
    PlayerService,
  ]
})
export class PlayerModule { }
