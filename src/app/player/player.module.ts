import { NgModule } from '@angular/core';

import { CardModule } from '../card/card.module';
import { PlayerRoutingModule } from './player-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PlayerFormComponent } from './player-form/player-form.component';
import { PlayerListComponent } from './player-list/player-list.component';

import { BlurDetectorDirective } from '../shared/detectors/blur-detector/blur-detector.directive';
import { CloseDetectorDirective } from '../shared/detectors/close-detector/close-detector.directive';
import { FocusDetectorDirective } from '../shared/detectors/focus-detector/focus-detector.directive';
import { OpenDetectorDirective } from '../shared/detectors/open-detector/open-detector.directive';

import { PlayerGuard } from './player.guard';

import { PlayerService } from './player.service';

@NgModule({
  imports: [
    CardModule,
    PlayerRoutingModule,
    SharedModule,
  ],
  declarations: [
    BlurDetectorDirective,
    CloseDetectorDirective,
    FocusDetectorDirective,
    OpenDetectorDirective,
    PlayerFormComponent,
    PlayerListComponent,
  ],
  providers: [
    PlayerGuard,
    PlayerService,
  ]
})
export class PlayerModule { }
