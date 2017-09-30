import { NgModule } from '@angular/core';

import { BlurDetectorDirective } from '../shared/blur-detector/blur-detector.directive';
import { CardModule } from '../card/card.module';
import { FocusDetectorDirective } from '../shared/focus-detector/focus-detector.directive';
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
    BlurDetectorDirective,
    FocusDetectorDirective,
    PlayerFormComponent,
    PlayerListComponent,
  ],
  providers: [
    PlayerGuard,
    PlayerService,
  ]
})
export class PlayerModule { }
